<?php
//session_start();

error_reporting(1);
date_default_timezone_set('Asia/Seoul');
global $conn;
$conn = mysqli_connect("localhost", "root", "Fk!i=a0@:K", "optikon") or die('Error connecting to mysql in sessionheader.inc');
//$conn = mysqli_connect("localhost", "root", "Fk!i=a0@:K", "sampk001") or die('Error connecting to mysql in sessionheader.inc');
mysqli_query($conn, "SET NAMES utf8");
mysqli_query($conn, "SET CHARACTER SET utf8");
session_cache_limiter('private_no_expire, must-revalidate');
$_SESSION['global_url'] = "http://www.notborder.org/cobalt";
//$_SESSION['global_url'] = "http://www.notborder.org/suleman";
$dir="optikon";
//$dir="suleman";
