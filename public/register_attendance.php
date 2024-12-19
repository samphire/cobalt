<?php
include "att_header.inc";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

$class_id = $_POST['class_id'];
$student_id = $_POST['student_id'];
$teacher_id = NULL; // Optional: Add logic for teacher if required
$date = date('Y-m-d');

$sql = "INSERT INTO tbl_chulsok (date, class_id, student_id, teacher_id) "
       ." VALUES (?, ?, ?, ?)"
       ." ON DUPLICATE KEY UPDATE teacher_id = VALUES(teacher_id)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sisi', $date, $class_id, $student_id, $teacher_id);

if ($stmt->execute()) {
    echo json_encode(['success' => 'Attendance registered']);
} else {
    echo json_encode(['error' => 'Failed to register attendance']);
}

$stmt->close();
$conn->close();
?>
