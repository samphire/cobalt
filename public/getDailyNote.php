<?php
include "sessionheader.inc";
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Sanitize and validate inputs
$classId = isset($_GET['classid']) ? trim($_GET['classid']) : null;
$date = isset($_GET['date']) ? trim($_GET['date']) : null;

// Simple date format check (YYYY-MM-DD)
if (empty($classId) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
    echo json_encode(['error' => 'Missing or invalid classid or date']);
    exit;
}

// Prepare SQL query
//$sql = "SELECT * FROM tbl_class_notes WHERE class_id = ? AND date = ?";
$sql = "SELECT notes FROM tbl_class_notes WHERE class_id = ? AND date = ? LIMIT 1";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("is", $classId, $date);
    $stmt->execute();
    $stmt->bind_result($notes);

    if ($stmt->fetch()) {
        echo json_encode(['notes' => $notes]);
    } else {
        // No entry yet for this date/class
        echo json_encode(['notes' => '']);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Query preparation failed']);
}
?>
