<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond to preflight request with status 200
    http_response_code(200);
    exit();
}
header('Content-Type: application/json');
date_default_timezone_set('Asia/Seoul');
$servername = "localhost";
$username = "root";
$password = "Fk!i=a0@:K";
$dbname = "optikon";
