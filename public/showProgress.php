<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
header('Content-Type: text/plain');
$myConn = mysqli_connect("localhost", "root", "Fk!i=a0@:K") or die('Error making custom mysqli connection' . mysqli_connect_error());
$sql="drop table if exists optikon.BOB";
$result = mysqli_query($myConn, $sql) or die("1".mysqli_error($myConn));
$sql="create temporary table optikon.BOB SELECT id, name, round(cash_earned/60) AS MathPerc FROM math.tbl_user join optikon.lnk_student_class on tbl_user.id = lnk_student_class.student_id where lnk_student_class.class_id={$_GET['classid']};";
$result = mysqli_query($myConn, $sql) or die("2".mysqli_error($myConn));
$sql="drop table if exists optikon.duck";
$result = mysqli_query($myConn, $sql) or die("3".mysqli_error($myConn));
$sql="create temporary table optikon.duck SELECT user_email, goalwords FROM reader3.users;";
$result = mysqli_query($myConn, $sql) or die("4".mysqli_error($myConn));
$sql="select * from optikon.duck";
$result = mysqli_query($myConn, $sql) or die("5".mysqli_error($myConn));
$sql="drop table if exists optikon.carvery";
$result = mysqli_query($myConn, $sql) or die("6".mysqli_error($myConn));
$sql="
create temporary table optikon.carvery
select user_email, numLearned, numLearning, avgRepnum from
reader3.users left join
(SELECT tim.userid, numLearned, numLearning, avgRepnum from
(SELECT amy.userid, numLearned, numLearning from
(SELECT userid, COUNT(headwordid) AS numLearned FROM reader3.learned group by userid) as amy
left join
(SELECT userid, COUNT(repnum) AS numLearning FROM reader3.learninglist group by userid) as glob
on amy.userid = glob.userid) as tim left join
(SELECT userid, AVG(repnum) AS avgRepnum FROM reader3.learninglist group by userid) as oboe
on tim.userid = oboe.userid
) as grey
on users.user_id=grey.userid;
";
$result = mysqli_query($myConn, $sql) or die("7 ".mysqli_error($myConn));

$sql="update optikon.carvery set numLearning = 0 where numLearning is null";
mysqli_query($myConn, $sql) or die("7b ".mysqli_error($myConn));
$sql="update optikon.carvery set avgRepnum = 0 where avgRepnum is null";
mysqli_query($myConn, $sql) or die("7c ".mysqli_error($myConn));


 $sql="drop table if exists optikon.sid";
 mysqli_query($myConn, $sql) or die("8 ".mysqli_error($myConn));
//$sql="SELECT tommy.*, class_id AS classid from
 $sql="create temporary table optikon.sid SELECT tommy.*, class_id AS classid from
(select  user_email AS id, name, numLearned, numLearning, avgRepnum, MathPerc, numLearned + round(numLearning * avgRepnum * 0.1) as wordscore from
optikon.carvery left join (SELECT BOB.*, duck.goalwords  from optikon.BOB left join optikon.duck on BOB.id = duck.user_email) as wowbob on carvery.user_email = wowbob.id) as tommy
join optikon.lnk_student_class on tommy.id=optikon.lnk_student_class.student_id
where class_id={$_GET['classid']} order by id;";
$result = mysqli_query($myConn, $sql) or die("9 ".mysqli_error($myConn));


mysqli_query($myConn, "use optikon") or die ("cannot 'use' optikon");


 $sql="drop table if exists optikon.testscores";
 mysqli_query($myConn, $sql) or die("10 ".mysqli_error($myConn));
 $sql="create temporary table `optikon`.`testscores` select id, round(avg(score)) AS avgscore from
 `optikon`.`tbl_testscore` join `optikon`.`tbl_students` on `tbl_testscore`.student_id=`tbl_students`.id group by id";
//  print ("\n\n$sql\n\n");
 mysqli_query($myConn, $sql) or die("11 ".mysqli_error($myConn));
 $sql="drop table if exists optikon.dolly";
 mysqli_query($myConn, $sql) or die("12 ".mysqli_error($myConn));
 $sql="create table optikon.dolly select sid.*, testscores.avgscore from sid join testscores on sid.id = testscores.id";
 mysqli_query($myConn, $sql) or die("13 ".mysqli_error($myConn));
 $sql="select dolly.*, round((least(wordscore, 1000))/10) as word, (least(MathPerc, 100)) AS math, round(least(avgrepnum*20, 100)) AS activity,
 round(((avgscore +  round((least(wordscore, 1000))/10) + (least(MathPerc, 100)) + round(least(avgrepnum*20, 100)))/ 4)) AS total from dolly";
 $result = mysqli_query($myConn, $sql) or die("14 ".mysqli_error($myConn));

$array = Array();
while($row = mysqli_fetch_assoc($result)){
    array_push($array,$row);
}
echo json_encode($array);
