<?php
// Simple resources API for cPanel/Apache PHP hosting
// Stores resources in a JSON file with file locking
// NOTE: For production, add authentication and stronger validation.

header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate');

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : ($method === 'GET' ? 'list' : '');

// Data directory under public; protected by .htaccess
$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/resources.json';

if (!is_dir($dataDir)) {
  @mkdir($dataDir, 0755, true);
}

// Optional admin token protection
$ADMIN_TOKEN = null;
// If token.php exists and defines ADMIN_TOKEN, load it
if (file_exists(__DIR__ . '/token.php')) {
  include_once __DIR__ . '/token.php';
  if (defined('ADMIN_TOKEN')) {
    $ADMIN_TOKEN = ADMIN_TOKEN;
  }
}

function get_header_token() {
  // Try to fetch custom header X-Admin-Token
  if (function_exists('getallheaders')) {
    $headers = getallheaders();
    foreach ($headers as $k => $v) {
      if (strcasecmp($k, 'X-Admin-Token') === 0) return $v;
    }
  }
  // Fallback to $_SERVER
  if (isset($_SERVER['HTTP_X_ADMIN_TOKEN'])) return $_SERVER['HTTP_X_ADMIN_TOKEN'];
  return null;
}

function read_json_file($file) {
  if (!file_exists($file)) {
    return [];
  }
  $fp = fopen($file, 'r');
  if (!$fp) return [];
  $size = filesize($file);
  if ($size === 0) { fclose($fp); return []; }
  $json = fread($fp, $size);
  fclose($fp);
  $data = json_decode($json, true);
  return is_array($data) ? $data : [];
}

function write_json_file($file, $data) {
  $fp = fopen($file, 'c+');
  if (!$fp) return false;
  if (!flock($fp, LOCK_EX)) { fclose($fp); return false; }
  ftruncate($fp, 0);
  rewind($fp);
  $ok = fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
  fflush($fp);
  flock($fp, LOCK_UN);
  fclose($fp);
  return $ok !== false;
}

function get_key_from_params($params) {
  $isExam = !empty($params['isExam']);
  if ($isExam) {
    $examId = isset($params['examId']) ? strtolower(trim($params['examId'])) : '';
    $resourceType = isset($params['resourceType']) ? strtolower(trim($params['resourceType'])) : '';
    if ($examId === '' || $resourceType === '') return '';
    return "exam_resources_{$examId}_{$resourceType}";
  } else {
    $levelId = isset($params['levelId']) ? strtolower(trim($params['levelId'])) : '';
    $grade = isset($params['grade']) ? strtolower(trim($params['grade'])) : '';
    $subject = isset($params['subject']) ? strtolower(trim($params['subject'])) : '';
    $resourceType = isset($params['resourceType']) ? strtolower(trim($params['resourceType'])) : '';
    if ($levelId === '' || $grade === '' || $subject === '' || $resourceType === '') return '';
    return "resources_{$levelId}_{$grade}_{$subject}_{$resourceType}";
  }
}

// Read input JSON when applicable
$input = file_get_contents('php://input');
$body = json_decode($input, true);
if (!is_array($body)) { $body = []; }

$params = array_merge($_GET, $body);
$key = get_key_from_params($params);

if ($key === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Missing or invalid parameters']);
  exit;
}

$data = read_json_file($dataFile);
if (!isset($data[$key]) || !is_array($data[$key])) {
  $data[$key] = [];
}

switch ($action) {
  case 'list':
    echo json_encode(['ok' => true, 'resources' => $data[$key]]);
    break;

  case 'save':
    if (!empty($ADMIN_TOKEN)) {
      $clientToken = get_header_token();
      if ($clientToken === null || !hash_equals($ADMIN_TOKEN, $clientToken)) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
        break;
      }
    }
    // Save full array of resources
    $resources = isset($body['resources']) && is_array($body['resources']) ? $body['resources'] : null;
    if ($resources === null) {
      http_response_code(400);
      echo json_encode(['ok' => false, 'error' => 'Invalid resources payload']);
      break;
    }
    // Normalize items: ensure id/title/url
    $norm = [];
    foreach ($resources as $r) {
      if (!is_array($r)) continue;
      $id = isset($r['id']) ? (string)$r['id'] : '';
      $title = isset($r['title']) ? trim((string)$r['title']) : '';
      $url = isset($r['url']) ? trim((string)$r['url']) : '';
      if ($title === '' || $url === '') continue;
      if ($id === '') { $id = uniqid('res_', true); }
      $norm[] = [ 'id' => $id, 'title' => $title, 'url' => $url ];
    }
    $data[$key] = $norm;
    if (!write_json_file($dataFile, $data)) {
      http_response_code(500);
      echo json_encode(['ok' => false, 'error' => 'Failed to write data']);
      break;
    }
    echo json_encode(['ok' => true, 'count' => count($norm)]);
    break;

  case 'delete':
    if (!empty($ADMIN_TOKEN)) {
      $clientToken = get_header_token();
      if ($clientToken === null || !hash_equals($ADMIN_TOKEN, $clientToken)) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
        break;
      }
    }
    $id = isset($body['id']) ? (string)$body['id'] : '';
    if ($id === '') {
      http_response_code(400);
      echo json_encode(['ok' => false, 'error' => 'Missing id']);
      break;
    }
    $before = count($data[$key]);
    $data[$key] = array_values(array_filter($data[$key], function($r) use ($id) {
      return isset($r['id']) ? ((string)$r['id'] !== $id) : true;
    }));
    if (!write_json_file($dataFile, $data)) {
      http_response_code(500);
      echo json_encode(['ok' => false, 'error' => 'Failed to write data']);
      break;
    }
    echo json_encode(['ok' => true, 'deleted' => ($before - count($data[$key]))]);
    break;

  default:
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Unsupported action']);
}
