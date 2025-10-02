// Simple API client for resources stored via PHP backend on cPanel
// Endpoints handled by public/api/resources.php

const API_URL = '/api/resources.php';

// Helper to optionally include admin token header (if configured)
function buildHeaders(json = false) {
  const headers = {};
  if (json) headers['Content-Type'] = 'application/json';
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (token) headers['X-Admin-Token'] = token;
  } catch (_) {}
  return headers;
}

function isDevEnv() {
  try {
    return process.env.NODE_ENV === 'development' || (typeof window !== 'undefined' && window.location.hostname === 'localhost');
  } catch (_) {
    return false;
  }
}

function localKey({ isExam = false, examId, levelId, grade, subject, resourceType }) {
  return isExam
    ? `exam_resources_${examId}_${resourceType}`
    : `resources_${levelId}_${grade}_${subject}_${resourceType}`;
}

function buildQuery(params) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      sp.append(k, String(v));
    }
  });
  return sp.toString();
}

export async function listResources({ isExam = false, examId, levelId, grade, subject, resourceType }) {
  const params = isExam
    ? { action: 'list', isExam: 1, examId, resourceType }
    : { action: 'list', levelId, grade, subject, resourceType };
  const url = `${API_URL}?${buildQuery(params)}`;
  try {
    const res = await fetch(url, { method: 'GET', credentials: 'same-origin' });
    if (!res.ok) throw new Error(`List failed: ${res.status}`);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'List error');
    return json.resources || [];
  } catch (err) {
    // Dev fallback to localStorage so local CRA can work without PHP
    if (isDevEnv() && typeof window !== 'undefined') {
      try {
        const key = localKey({ isExam, examId, levelId, grade, subject, resourceType });
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
      } catch (_) { return []; }
    }
    throw err;
  }
}

export async function saveResources({ isExam = false, examId, levelId, grade, subject, resourceType }, resources) {
  // Add createdAt timestamp to each resource if it doesn't exist
  const resourcesWithTimestamps = resources.map(resource => ({
    ...resource,
    createdAt: resource.createdAt || new Date().toISOString(),
  }));

  const base = isExam ? { isExam: 1, examId, resourceType } : { levelId, grade, subject, resourceType };
  try {
    const res = await fetch(`${API_URL}?action=save`, {
      method: 'POST',
      headers: buildHeaders(true),
      credentials: 'same-origin',
      body: JSON.stringify({ ...base, resources: resourcesWithTimestamps }),
    });
    if (!res.ok) throw new Error(`Save failed: ${res.status}`);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Save error');
    return json;
  } catch (err) {
    if (isDevEnv() && typeof window !== 'undefined') {
      try {
        const key = localKey({ isExam, examId, levelId, grade, subject, resourceType });
        window.localStorage.setItem(key, JSON.stringify(resourcesWithTimestamps));
        return { ok: true, count: resourcesWithTimestamps.length };
      } catch (_) { /* ignore */ }
    }
    throw err;
  }
}

export async function deleteResource({ isExam = false, examId, levelId, grade, subject, resourceType }, id) {
  const base = isExam ? { isExam: 1, examId, resourceType } : { levelId, grade, subject, resourceType };
  try {
    const res = await fetch(`${API_URL}?action=delete`, {
      method: 'POST',
      headers: buildHeaders(true),
      credentials: 'same-origin',
      body: JSON.stringify({ ...base, id }),
    });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Delete error');
    return json;
  } catch (err) {
    if (isDevEnv() && typeof window !== 'undefined') {
      try {
        const key = localKey({ isExam, examId, levelId, grade, subject, resourceType });
        const raw = window.localStorage.getItem(key);
        const arr = raw ? JSON.parse(raw) : [];
        const next = Array.isArray(arr) ? arr.filter(r => r.id !== id) : [];
        window.localStorage.setItem(key, JSON.stringify(next));
        return { ok: true, deleted: 1 };
      } catch (_) { /* ignore */ }
    }
    throw err;
  }
}

// Search across all stored resources (server-wide)
// Get recently added resources (newest first)
export async function getRecentResources(limit = 5) {
  const url = `${API_URL}?${buildQuery({ action: 'recent', limit })}`;
  try {
    const res = await fetch(url, { method: 'GET', credentials: 'same-origin' });
    if (!res.ok) throw new Error(`Fetch recent failed: ${res.status}`);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Recent resources error');
    return json.resources || [];
  } catch (err) {
    if (isDevEnv() && typeof window !== 'undefined') {
      // Dev fallback: scan localStorage for recent items
      try {
        const allResources = [];
        
        // Get all resources from localStorage
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (!key) continue;
          
          let ctx = null;
          if (key.startsWith('exam_resources_')) {
            const rest = key.slice('exam_resources_'.length);
            const parts = rest.split('_');
            const examId = parts[0] || '';
            const resourceType = parts[1] || '';
            ctx = { isExam: true, examId, resourceType };
          } else if (key.startsWith('resources_')) {
            const rest = key.slice('resources_'.length);
            const parts = rest.split('_');
            const levelId = parts[0] || '';
            const grade = parts[1] || '';
            const subject = parts[2] || '';
            const resourceType = parts[3] || '';
            ctx = { isExam: false, levelId, grade, subject, resourceType };
          }
          
          if (!ctx) continue;
          
          const raw = window.localStorage.getItem(key);
          let arr = [];
          try { arr = raw ? JSON.parse(raw) : []; } catch (_) { arr = []; }
          
          // Add each resource with its context and creation time
          arr.forEach(resource => {
            allResources.push({
              ...resource,
              // Use the resource's timestamp or current time if not available
              createdAt: resource.createdAt || new Date().toISOString(),
              context: ctx
            });
          });
        }
        
        // Sort by creation date (newest first) and limit results
        return allResources
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, limit);
      } catch (_) { 
        return []; 
      }
    }
    throw err;
  }
}

export async function searchResources(query) {
  const url = `${API_URL}?${buildQuery({ action: 'search', q: query })}`;
  try {
    const res = await fetch(url, { method: 'GET', credentials: 'same-origin' });
    if (!res.ok) throw new Error(`Search failed: ${res.status}`);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Search error');
    return json.resources || [];
  } catch (err) {
    if (isDevEnv() && typeof window !== 'undefined') {
      // Dev fallback: scan localStorage keys we control
      try {
        const results = [];
        const qLower = String(query || '').toLowerCase();
        for (let i = 0; i < window.localStorage.length; i++) {
          const k = window.localStorage.key(i);
          if (!k) continue;
          let ctx = null;
          if (k.startsWith('exam_resources_')) {
            const rest = k.slice('exam_resources_'.length);
            const parts = rest.split('_');
            const examId = parts[0] || '';
            const resourceType = parts[1] || '';
            ctx = { isExam: true, examId, resourceType };
          } else if (k.startsWith('resources_')) {
            const rest = k.slice('resources_'.length);
            const parts = rest.split('_');
            const levelId = parts[0] || '';
            const grade = parts[1] || '';
            const subject = parts[2] || '';
            const resourceType = parts[3] || '';
            ctx = { isExam: false, levelId, grade, subject, resourceType };
          }
          if (!ctx) continue;
          const raw = window.localStorage.getItem(k);
          let arr = [];
          try { arr = raw ? JSON.parse(raw) : []; } catch (_) { arr = []; }
          if (!Array.isArray(arr)) continue;
          for (const r of arr) {
            const title = (r && r.title) ? String(r.title) : '';
            const url = (r && r.url) ? String(r.url) : '';
            if (!qLower || title.toLowerCase().includes(qLower) || url.toLowerCase().includes(qLower)) {
              results.push({ id: r.id || '', title, url, context: ctx });
            }
          }
        }
        return results;
      } catch (_) { return []; }
    }
    throw err;
  }
}
