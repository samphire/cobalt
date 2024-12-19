
<?php
include "att_header.inc";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

$class_id = $_POST['class_id'];

$sql = "SELECT s.id, s.name FROM tbl_students s "
       . " INNER JOIN lnk_student_class sc ON s.id = sc.student_id"
        . " WHERE sc.class_id = ? AND sc.end > CURDATE()";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $class_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $students = [];
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    echo json_encode($students);
} else {
    echo json_encode([]);
}

$stmt->close();
$conn->close();
?>
