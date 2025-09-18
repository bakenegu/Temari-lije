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
  const base = isExam ? { isExam: 1, examId, resourceType } : { levelId, grade, subject, resourceType };
  try {
    const res = await fetch(`${API_URL}?action=save`, {
      method: 'POST',
      headers: buildHeaders(true),
      credentials: 'same-origin',
      body: JSON.stringify({ ...base, resources }),
    });
    if (!res.ok) throw new Error(`Save failed: ${res.status}`);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Save error');
    return json;
  } catch (err) {
    if (isDevEnv() && typeof window !== 'undefined') {
      try {
        const key = localKey({ isExam, examId, levelId, grade, subject, resourceType });
        window.localStorage.setItem(key, JSON.stringify(resources));
        return { ok: true, count: resources.length };
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
