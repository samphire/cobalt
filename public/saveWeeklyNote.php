<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');
// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
include "sessionheader.inc";

// Get the raw POST body and decode JSON
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

$studentId = isset($data['studentid']) ? $data['studentid'] : null;
$week = isset($data['week']) ? intval($data['week']) : null;
$note = isset($data['note']) ? $data['note'] : null;

if (!$studentId || !$week) {
    echo json_encode(['success' => false, 'message' => 'Missing studentid or week']);
    exit;
}

// Check if the note already exists
$checkSql = "SELECT id FROM tbl_report WHERE student_id = ? AND week = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("si", $studentId, $week);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($row = $checkResult->fetch_assoc()) {
    // Record exists — update it
    $updateSql = "UPDATE tbl_report SET report_notes = ?, created_at = NOW() WHERE id = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("si", $note, $row['id']);
    $updateStmt->execute();
    $updateStmt->close();
    echo json_encode(['success' => true, 'message' => 'Note updated']);
} else {
    // No record — insert it
    $insertSql = "INSERT INTO tbl_report (student_id, week, report_notes) VALUES (?, ?, ?)";
    $insertStmt = $conn->prepare($insertSql);
    $insertStmt->bind_param("sis", $studentId, $week, $note);
    $insertStmt->execute();
    $insertStmt->close();
    echo json_encode(['success' => true, 'message' => 'Note inserted']);
}

$checkStmt->close();
?>
