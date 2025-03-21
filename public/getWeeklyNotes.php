<?php
include "sessionheader.inc";
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Sanitize and validate inputs
$studentId = isset($_GET['studentid']) ? $_GET['studentid'] : null;
$week = isset($_GET['week']) ? intval($_GET['week']) : null;

if (!$studentId || !$week) {
    echo json_encode(['error' => 'Missing or invalid studentid or week']);
    exit;
}

// Prepare SQL query
$sql = "SELECT report_notes FROM tbl_report WHERE student_id = ? AND week = ? LIMIT 1";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("si", $studentId, $week);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode(['note' => $row['report_notes']]);
    } else {
        echo json_encode(['note' => '']); // No report found, return empty note
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Query preparation failed']);
}
?>
