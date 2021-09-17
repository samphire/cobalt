<?php

$data = json_decode(file_get_contents('php://input'), true);

$conn = mysqli_connect("localhost", "root", "Fk!i=a0@:K", "optikon") or die('Error connecting to mysql in sessionheader.inc' . mysqli_connect_error());
$data['name'] = mysqli_real_escape_string($conn, $data['name']);
$data['description'] = mysqli_real_escape_string($conn, $data['description']);
$sql = "INSERT INTO `optikon`.`tbl_tests`
        (`name`,
        `description`,
        `print_wrong`,
        `print_answer`,
        `oneshot`,
        `retain`,
        `timer`)
        VALUES
        ('{$data['name']}',
        '{$data['description']}',
        {$data['pwrong']},
        {$data['panswer']},
        {$data['oneshot']},
        {$data['retain']},
        {$data['timer']});

";
$query = mysqli_query($conn, $sql);
echo mysqli_affected_rows($conn)?'success':'fail';

?>
