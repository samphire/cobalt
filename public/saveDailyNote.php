<?php
// saveDailyNote.php
include "sessionheader.inc";  // must initialize $conn

// Enable detailed error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Read JSON payload
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$classId = isset($data['classid']) ? intval($data['classid']) : null;
$date    = isset($data['date'])    ? trim($data['date'])    : null;
$notes   = isset($data['note'])    ? trim($data['note'])    : null;

// Validate inputs
if (empty($classId) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
    echo json_encode(['error' => 'Missing or invalid classid or date']);
    exit;
}

// Use ON DUPLICATE KEY to insert or update
$sql = "INSERT INTO tbl_class_notes (class_id, date, notes) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE notes = VALUES(notes)";

try {
    $stmt = $conn->prepare($sql);
    // i = integer, s = string, s = string
    $stmt->bind_param('iss', $classId, $date, $notes);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    // Log error for server-side diagnosis
    error_log('saveDailyNote ERROR: ' . $e->getMessage());
    echo json_encode(['error' => 'Database error saving note']);
}
