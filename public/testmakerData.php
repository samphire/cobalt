<?php

$data = json_decode(file_get_contents('php://input'), true);

$conn = mysqli_connect("localhost", "root", "Fk!i=a0@:K", "optikon") or die('Error connecting to optikon' . mysqli_connect_error());
mysqli_query($conn, "SET NAMES utf8");
mysqli_query($conn, "SET CHARACTER SET utf8");
$data['name'] = mysqli_real_escape_string($conn, $data['name']);
$data['description'] = mysqli_real_escape_string($conn, $data['description']);
$sql = "INSERT INTO `optikon`.`tbl_tests`
        (`name`,
        `description`,
        `oneshot`,
        `retain`,
        `timer`)
        VALUES
        ('{$data['name']}',
        '{$data['description']}',
        {$data['oneshot']},
        {$data['retain']},
        {$data['timer']});
";
$query = mysqli_query($conn, $sql);
echo mysqli_affected_rows($conn)?'success':'fail';

?>
