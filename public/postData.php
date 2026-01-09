<?php
include "sessionheader.inc";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

// ############   STUDENTS   ############
if ($_GET['type'] == "students") {
    $sql = "SELECT * FROM tbl_students";
    $result = mysqli_query($conn, $sql) or die("error in getting students" . mysqli_error($conn));
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
    exit;
}

if ($_GET['type'] == "newStudent") {

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $msg = "student " . $data->name;

    $data->DOB = $data->DOB ?: 'null';
    $data->join_date = $data->join_date ?: 'null';
    $data->last_active_date = $data->last_active_date ?: 'null';

    if ($_GET['isEdit'] == 'yes') {
        $msg .= " updated";

        //  Optikon
        $sql = "UPDATE `optikon`.`tbl_students` SET `pass` = '$data->pass', `name` = '$data->name', `DOB` = NULLIF('$data->DOB', 'NULL'), `sex` = '$data->sex',"
        . " `mobile` = '$data->mobile', `email` = '$data->email', `notes` = \"" . $data->notes . "\", `picUrl` = '$data->picUrl', `language_id` = '$data->language_id',"
        . " `join_date` = NULLIF('$data->join_date', 'NULL'), `last_active_date` = NULLIF('$data->last_active_date', 'NULL'), `isActive` = $data->isActive,"
        . " `guardian_name` = '$data->guardian_name', `guardian_mobile` = '$data->guardian_mobile' WHERE `id` = '$data->id'";
        mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

        //  Math
        $sql = "UPDATE `math`.`tbl_user` SET `name` = '$data->name', `email` = '$data->email' WHERE `id` = '$data->id'";
        mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

        //  Reader3
        $sql = "UPDATE `reader3`.`users` SET `user_name` = '$data->name', `pass_word` = md5('$data->pass') WHERE `user_email` = '$data->id'";
        mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

       // TODO: IMPLEMENT CHOOSING GROUP FOR STUDENT IN COBALT

    } else {

$stmt = $conn->prepare("
    INSERT IGNORE INTO tbl_students
        (id, `pass`, name, DOB, sex, mobile, email, notes, picUrl,
         language_id, join_date, last_active_date, isActive,
         guardian_name, guardian_mobile, guardian_email, `billing date`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

if (!$stmt) {
    die('Prepare failed: ' . $conn->error);
}

$stmt->bind_param(
    "sssssssssississsi",
    $data->id,              // s
    $data->pass,            // s
    $data->name,            // s
    $data->$dob,                   // s
    $data->sex,             // s
    $data->mobile,          // s
    $data->email,           // s
    $data->notes,           // s
    $data->picUrl,          // s
    $data->language_id,     // i
    $data->$joinDate,              // s
    $data->$lastActive,            // s
    $data->isActive,        // i
    $data->guardian_name,   // s
    $data->guardian_mobile, // s
    $data->guardian_email,  // s
    $data->billing_date     // i
);

if (!$stmt->execute()) {
    die('Execute failed: ' . $stmt->error);
}

$stmt->close();



        //math 1
        $sql = "INSERT IGNORE INTO `math`.`tbl_user`"
                ." (`id`, `name`, `nickname`, `email`)"
                ." VALUES ('$data->id', '$data->name', '$data->name', '$data->email')";
        mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

        //math 2
        $sql = "INSERT IGNORE INTO `math`.`tbl_user_has_tbl_story` (`tbl_user_id`, `tbl_story_id`, `avatar_lvl`, `perfects`, `tbl_avatars_id`)"
                ." VALUES ('$data->id', '4', '1', '0', '1')";
        mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

        //math 3
        $sql = "SELECT * from `math`.`tbl_scores` WHERE `user`='$data->id'";
        if(mysqli_num_rows(mysqli_query($conn, $sql)) < 1){
            $newStoryId = mysqli_query($conn, "SELECT `tbl_story_id` AS story FROM `math`.`tbl_user_has_tbl_story` WHERE `tbl_user_id` ='$data->id'")->fetch_object()->story;
            $sql = "SELECT * FROM `math`.`tbl_story_has_tbl_exercise` WHERE `tbl_story_id`=$newStoryId";
            $result = mysqli_query($conn, $sql);
            while(list(,$exercise) = mysqli_fetch_row($result)){
                $sql="INSERT INTO `math`.`tbl_scores` (`user`, `tbl_story_has_tbl_exercise_tbl_story_id`, `tbl_story_has_tbl_exercise_tbl_exercise_id`, `iterations_done`)"
                ." VALUES ('$data->id', '" . $newStoryId . "', '" . $exercise . "', '0')";
                mysqli_query($conn, $sql) or die("Error creating exercises for new user in optikon math tbl_scores " . mysqli_error($conn) . "\n\n" . $sql);
            }
        }
        //reader3 1
        $sql = "INSERT IGNORE INTO `reader3`.`users`"
                ."(`user_email`,`user_name`,`pass_word`)"
                ." VALUES('$data->id', '$data->name', md5('$data->pass'))";
        mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

        //reader3 2
        $genID = mysqli_query($conn, "SELECT `user_id` from `reader3`.`users` WHERE `user_email` = '$data->id'")->fetch_object()->user_id;
        $sql = "INSERT IGNORE INTO `reader3`.`users_has_groups`"
        ." (`users_user_id`, `groups_group_id`)"
        ." VALUES($genID, 4)";
        mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

        $msg .= " added";
    }
    echo json_encode($msg);
}

if ($_GET['type'] == 'delStud') {
    header("Access-Control-Allow-Methods: DELETE");
    $msg = "STUDENT " . $_GET['studid'] . " deleted";
//math
    $sql = "delete from `math`.`tbl_user` where `id`='" . $_GET['studid'] . "'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting math.user\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `math`.`tbl_scores` WHERE `user` = '" . $_GET['studid'] . "'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting math.tbl_scores\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `math`.`tbl_user_has_tbl_story` WHERE `tbl_user_id` = '" . $_GET['studid'] . "'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting math.tbl_user_has_tbl_story\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `math`.`user_tt_times` WHERE `user_id` = '" . $_GET['studid'] . "'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting math.user_tt_times\n\n" . mysqli_error($conn) . "\n\n" . $sql);

//optikon
    $sql = "DELETE FROM `optikon`.`lnk_student_class` WHERE `student_id` = '" . $_GET['studid'] . "'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting lnk_student_class\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `optikon`.`tbl_responses` WHERE `student_id` = '" . $_GET['studid'] . "'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting tbl_responses\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `optikon`.`tbl_students` WHERE `id` = '" . $_GET['studid'] . "'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting tbl_students\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `optikon`.`tbl_testscore` WHERE `student_id` = '" . $_GET['studid'] . "'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting tbl_testscore\n\n" . mysqli_error($conn) . "\n\n" . $sql);

//reader
    $genID = mysqli_query($conn, "SELECT `user_id` from `reader3`.`users` WHERE `user_email` = '" . $_GET['studid'] . "'")->fetch_object()->user_id;
    $sql = "DELETE FROM `reader3`.`activity_log` WHERE `userid` = '$genID'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting activity_log\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `reader3`.`chron_data` WHERE `userid` = '$genID'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting chron_data\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `reader3`.`goals` WHERE `userid` = '$genID'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting goals\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `reader3`.`journal` WHERE `userid` = '$genID'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting journal\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `reader3`.`learned` WHERE `userid` = '$genID'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting learned\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `reader3`.`learninglist` WHERE `userid` = '$genID'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting learninglist\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `reader3`.`users` WHERE `user_id` = '$genID'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting users\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `reader3`.`users_has_groups` WHERE `users_user_id` = '$genID'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting users_has_groups\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `reader3`.`usertext` WHERE `userid` = '$genID'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting usertext\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "DELETE FROM `reader3`.`voca_test_activity` WHERE `userid` = '$genID'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting voca_test_activity\n\n" . mysqli_error($conn) . "\n\n" . $sql);

    echo $msg;
}

// ############   TESTS   ############
if ($_GET['type'] == "tests") {
    $sql = "SELECT * FROM tbl_tests order by id desc";
    $result = mysqli_query($conn, $sql) or die("error in getting tests" . mysqli_error($conn));
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
    exit;
}

if ($_GET['type'] == "newTest") {

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $msg = "test " . $data->name;

    $name = $data->name;
    $description = $data->description;
    $print_wrong = (int) $data->print_wrong;
    $print_answer = (int) $data->print_answer;
    $oneshot = (int) $data->oneshot;
    $retain = (int) $data->retain;
    $timer = (int) $data->timer;
    $id = (int) $data->id;

    if ($_GET['isEdit'] == 'yes') {
    $msg .= ", " . $data->id;
    $stmt = $conn->prepare("UPDATE tbl_tests SET name = ?, description = ?, print_wrong = ?, print_answer = ?, oneshot = ?, retain = ?, timer = ? WHERE id = ?");
    if (!$stmt) {
        die("Prepare failed: (" . $conn->errno . ") " . $conn->error);
    }
    $stmt->bind_param("ssiiiiii", $name, $description, $print_wrong, $print_answer, $oneshot, $retain, $timer, $id);
    $msg .= " updated";
    } else {
    $stmt = $conn->prepare("INSERT IGNORE INTO tbl_tests(name, description, print_wrong, print_answer, oneshot, retain, timer) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiiiii", $data->name, $data->description, $data->print_wrong, $data->print_answer, $data->oneshot, $data->retain, $data->timer);
    $msg .= " added";
    }
    if (!$stmt->execute()) {
        echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
        exit;
    }

    echo "Rows updated: " . $stmt->affected_rows;
    echo json_encode($msg);
}

if ($_GET['type'] == 'delTest') {
    header("Access-Control-Allow-Methods: DELETE");
    $sql = "delete from tbl_tests where id='{$_GET['testid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting test\n\n" . mysqli_error($conn) . "\n\n" . $sql);


    $sql = "delete from tbl_testscore where test_id='{$_GET['testid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting test from tbl_testscores\n\n" . mysqli_error($conn) . "\n\n" . $sql);


    $sql = "delete from tbl_questions where test_id='{$_GET['testid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting test from tbl_questions\n\n" . mysqli_error($conn) . "\n\n" . $sql);


    $sql = "delete from tbl_responses where test_id='{$_GET['testid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting test from tbl_responses\n\n" . mysqli_error($conn) . "\n\n" . $sql);


    $sql = "delete from lnk_class_test where test_id='{$_GET['testid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting test from lnk_class_test\n\n" . mysqli_error($conn) . "\n\n" . $sql);


    $sql = "delete from lnk_class_test_archive where test_id='{$_GET['testid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting test from lnk_class_test_archive\n\n" . mysqli_error($conn) . "\n\n" . $sql);


    $sql = "delete from tbl_test_course where
                test1_id='{$_GET['testid']}' or
                test2_id='{$_GET['testid']}' or
                test3_id='{$_GET['testid']}' or
                test4_id='{$_GET['testid']}' or
                test5_id='{$_GET['testid']}' or
                test6_id='{$_GET['testid']}' or
                test7_id='{$_GET['testid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting test from tbl_test_course\n\n" . mysqli_error($conn) . "\n\n" . $sql);

    echo "deleted";
}

// ############   CLASSES   ############
if ($_GET['type'] == "classes") {
    $sql = "SELECT * FROM tbl_classes";
    $result = mysqli_query($conn, $sql) or die("error in getting classes" . mysqli_error($conn));
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
    exit;
}

if ($_GET['type'] == "newClass") {

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $msg = "class ";

    $data->comment = mysqli_real_escape_string($conn, $data->comment);

    if ($_GET['isEdit'] == 'yes') {
        $msg .= "updated";
        $sql = "update tbl_classes set
        name = '$data->name'
        ,comment ='$data->comment'
        ,session_start = '$data->session_start'
        ,session_end = '$data->session_end'
        where id='$data->id'";
    } else {
        $sql = "INSERT IGNORE into tbl_classes(name, comment, session_start, session_end) VALUES(\"" .
            $data->name . "\",\"" .
            $data->comment . "\",\"" .
            $data->session_start . "\",\"" .
            $data->session_end . "\")";
    }

    mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

    echo json_encode($msg);
}

if ($_GET['type'] == 'delClass') {
    header("Access-Control-Allow-Methods: DELETE");
    $sql = "delete from tbl_classes where id='{$_GET['classid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting class\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "delete from lnk_class_test where class_id='{$_GET['classid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting class from lnk_class_test\n\n" . mysqli_error($conn) . "\n\n" . $sql);

    echo "deleted";
}

// ############   TESTALLOCS   ############
if ($_GET['type'] == "testAllocs") {
    $sql = "SELECT testid, testname, class_id as classid, name as classname, start, finish FROM
(SELECT tbl_tests.id as testid, tbl_tests.name as testname, lnk_class_test.class_id, lnk_class_test.start, lnk_class_test.finish
from tbl_tests join lnk_class_test
on tbl_tests.id = lnk_class_test.test_id) as bob join tbl_classes
on bob.class_id = tbl_classes.id order by start asc";
    $result = mysqli_query($conn, $sql) or die("error in getting Test Allocations" . mysqli_error($conn));
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
    exit;
}

if ($_GET['type'] == "newTestAlloc") {

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $msg = "test allocation ";

    if ($_GET['isEdit'] == 'yes') {
        $msg .= "updated";
        $sql = "update lnk_class_test set start = '$data->start', finish = '$data->finish' where test_id='$data->testid' and class_id='$data->classid'";
    } else {
        $sql = "INSERT IGNORE into lnk_class_test(class_id, test_id, start, finish) VALUES(\"" .
            $data->classid . "\",\"" .
            $data->testid . "\",\"" .
            $data->start . "\",\"" .
            $data->finish . "\")";
    }

    mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

    echo json_encode($msg);
}

if ($_GET['type'] == 'delTestAlloc') {
    header("Access-Control-Allow-Methods: DELETE");
    $sql = "delete from tbl_testscore where test_id='{$_GET['testid']}' and student_id in "
        . "(SELECT student_id FROM lnk_class_test join lnk_student_class on lnk_class_test.class_id = lnk_student_class.class_id "
        . "where lnk_class_test.class_id='{$_GET['classid']}' and lnk_class_test.test_id='{$_GET['testid']}')";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting from tbl_testscore for class allocation\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "delete from tbl_responses where test_id='{$_GET['testid']}' and student_id in "
        . "(SELECT student_id FROM lnk_class_test join lnk_student_class on lnk_class_test.class_id = lnk_student_class.class_id "
        . "where lnk_class_test.class_id='{$_GET['classid']}' and lnk_class_test.test_id='{$_GET['testid']}')";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting from tbl_responses for class allocation\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    echo "tbl_testscores and tbl_responses successfully removed for the given test allocation";
    $sql = "delete from lnk_class_test where test_id='{$_GET['testid']}' and class_id='{$_GET['classid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting class test allocation\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    echo "test allocation deleted";
}

if ($_GET['type'] == 'resetTestAlloc') {
    header("Access-Control-Allow-Methods: DELETE");
    $sql = "delete from tbl_testscore where test_id='{$_GET['testid']}' and student_id in "
        . "(SELECT student_id FROM lnk_class_test join lnk_student_class on lnk_class_test.class_id = lnk_student_class.class_id "
        . "where lnk_class_test.class_id='{$_GET['classid']}' and lnk_class_test.test_id='{$_GET['testid']}')";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting from tbl_testscore for class allocation\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "delete from tbl_responses where test_id='{$_GET['testid']}' and student_id in "
        . "(SELECT student_id FROM lnk_class_test join lnk_student_class on lnk_class_test.class_id = lnk_student_class.class_id "
        . "where lnk_class_test.class_id='{$_GET['classid']}' and lnk_class_test.test_id='{$_GET['testid']}')";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting from tbl_responses for class allocation\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    echo "tbl_testscores and tbl_responses successfully removed for the given test allocation";
}

// ############   QUESTIONS   ############
if ($_GET['type'] == "questions") {
    $sql = "SELECT * FROM tbl_questions where test_id={$_GET['testid']}";
    $result = mysqli_query($conn, $sql) or die("error in getting questions" . mysqli_error($conn));
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
    exit;
}

if ($_GET['type'] == "imagesForTest") {
    $path = "/var/www/html/$dir/images/";
    $sql = "SELECT image FROM tbl_questions where test_id={$_GET['testid']}";
    $result = mysqli_query($conn, $sql) or die("error getting images for test " . mysqli_error($conn));
    $array = array();
    $yes = true;
    while ($row = mysqli_fetch_assoc($result)) {
//        echo "\n" . $row['image'];
//        echo "\n" . strlen($row['image']);
//        echo "\n" . $path . $row['image'];
        if (strlen($row['image']) > 0 && !file_exists($path . $row['image'])) {
            $yes = false;
        }
    }
    echo $yes ? "yes" : "no";
    exit;
}

if ($_GET['type'] == "newQuestion") {

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $msg = "question ";

    $data->text1 = mysqli_real_escape_string($conn, $data->text1);
    $data->text2 = mysqli_real_escape_string($conn, $data->text2);
    $data->text3 = mysqli_real_escape_string($conn, $data->text3);
    $data->text4 = mysqli_real_escape_string($conn, $data->text4);
    $data->text5 = mysqli_real_escape_string($conn, $data->text5);
    $data->text6 = mysqli_real_escape_string($conn, $data->text6);
    $data->text7 = mysqli_real_escape_string($conn, $data->text7);
    $data->rubrik = mysqli_real_escape_string($conn, $data->rubrik);
    $data->answer = mysqli_real_escape_string($conn, $data->answer);

    if ($_GET['isEdit'] == 'yes') {
        $msg .= "updated";
        $sql = "UPDATE tbl_questions SET qnum = {$data->qnum}, text1 = '{$data->text1}', text2 = '{$data->text2}', text3 = '{$data->text3}', text4 = '{$data->text4}', "
            . "text5 = '{$data->text5}', text6 = '{$data->text6}', text7 = '{$data->text7}', answer = '{$data->answer}', type = '{$data->type}', rubrik = '{$data->rubrik}', "
            . "image = '{$data->image}', audio = '{$data->audio}', video =  '{$data->video}' WHERE test_id = {$data->test_id} AND qnum = {$data->qnum}";
    } else {
        $msg .= "added";

        $sql = "INSERT IGNORE INTO tbl_questions (test_id, qnum, text1, text2, text3, text4, text5, text6, text7, answer, type, rubrik, image, audio, video) VALUES ("
            . "{$data->test_id}, {$data->qnum}, '{$data->text1}', '{$data->text2}', '{$data->text3}', '{$data->text4}', '{$data->text5}', '{$data->text6}', "
            . "'{$data->text7}', '{$data->answer}', '{$data->type}', '{$data->rubrik}', '{$data->image}', '{$data->audio}', '{$data->video}')";
    }
    echo $sql;
    mysqli_query($conn, $sql) or die("hey! Cannot add question " . mysqli_error($conn));
    echo json_encode($msg);
}

if ($_GET['type'] == 'delQuestion') {
    header("Access-Control-Allow-Methods: DELETE");
    $sql = "delete from tbl_questions where test_id='{$_GET['testid']}' AND qnum='{$_GET['qnum']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting question\n\n" . mysqli_error($conn) . "\n\n" . $sql);

    echo "question deleted";
}

// ###########   STUDALLOCS   #############
if ($_GET['type'] == "newStudAlloc") {
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $msg = "student class allocation ";

    if ($_GET['isEdit'] == 'yes') {
        $msg .= "updated";
        $sql = "update lnk_student_class set begin = '$data->begin', end = '$data->end' where student_id='$data->studid' and class_id='$data->classid'";
    } else {
        $msg .= "added";
        $sql = "INSERT IGNORE into lnk_student_class(student_id, class_id, begin, end) VALUES(\"" .
            $data->studid . "\",\"" .
            $data->classid . "\",\"" .
            $data->begin . "\",\"" .
            $data->end . "\")";
    }
    mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);
    echo json_encode($msg);
}
if ($_GET['type'] == "studAllocs") {
    $sql = "select bob.student_id as studid, bob.name as studName, bob.class_id as classid, tbl_classes.name as className, " .
        "tbl_classes.comment, bob.begin, bob.end from tbl_classes join " .
        "(SELECT lnk_student_class.*, tbl_students.name FROM lnk_student_class join tbl_students " .
        "on lnk_student_class.student_id = tbl_students.id) as bob on tbl_classes.id = bob.class_id";
    $result = mysqli_query($conn, $sql) or die("error in getting tests" . mysqli_error($conn));
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
    exit;
}

if ($_GET['type'] == "delStudAlloc") {
    header("Access-Control-Allow-Methods: DELETE");
    $sql = "delete from lnk_student_class where student_id='{$_GET['studid']}' and class_id='{$_GET['classid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting student class allocation\n\n" . mysqli_error($conn) . "\n\n" . $sql);

    echo "student class allocation deleted";
}

// ############   MISCELLANEOUS   ############
if ($_GET['type'] == "individual_test_data") {

    $sql = "
        select id, name, oneshot, score, start, finish from tbl_tests join
        (select valid_tests.student_id, valid_tests.test_id, score, start, finish from tbl_testscore
        right join
        (select student_id, test_id, start, finish from
        (select test_id, start, finish from lnk_class_test where class_id=" . $_GET['classid'] . ") as classTests
        join
        (select student_id, begin, end from lnk_student_class where student_id='" . $_GET['studid'] . "' and class_id=" . $_GET['classid'] . ")
        as studentDates
        where start >= begin and start <= end) as valid_tests
        on tbl_testscore.student_id = valid_tests.student_id and tbl_testscore.test_id = valid_tests.test_id)
        AS scores_for_student
        on tbl_tests.id = scores_for_student.test_id
        order by oneshot, id";


//    order by id";
    $result = mysqli_query($conn, $sql);
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
}

if($_GET['type'] == "individual_vocatest_due") {
    $sql = "SELECT count(`userid`) AS bob FROM `reader3`.`learninglist` JOIN `reader3`.`users` ON `learninglist`.`userid` = `users`.`user_id`"
    . " WHERE `users`.`user_email` = " . $_GET['studid'] . " AND `datenext` < now()";
    echo (mysqli_query($conn, $sql)->fetch_object()->bob ?? 'default');
}

if ($_GET['type'] == "languages") {
    $sql = "SELECT * FROM tbl_language";
    $result = mysqli_query($conn, $sql);
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
}

if ($_GET['type'] == 'imgUpload') {
    $target_dir = "/var/www/html/$dir/images/";
    foreach ($_FILES as $file) {
//        echo $file['name'] . $file['type'] . $file['size'];
        $target_file = $target_dir . basename($file['name']);
        if (move_uploaded_file($file['tmp_name'], $target_file)) {
            echo $file['name'] . " successfully uploaded.";
        } else {
            echo "some problem uploading image files";
        }
    }
}

if ($_GET['type'] == 'studPicUpload') {
    $target_dir = "/var/www/html/$cloneDir/userPics/";
    foreach ($_FILES as $file) {
//        $target_file = $target_dir . pathinfo($file['name'], PATHINFO_FILENAME) . "." . strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $target_file = $target_dir . $_POST['studid'] . "." . strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (move_uploaded_file($file['tmp_name'], $target_file)) {
            echo $target_file . " successfully uploaded.";
        } else {
            echo "some problem uploading image files";
        }
    }
}

if ($_GET['type'] == 'audUpload') {
    $target_dir = "/var/www/html/$dir/media/audio/";
    foreach ($_FILES as $file) {
//        echo $file['name'] . $file['type'] . $file['size'];
        $target_file = $target_dir . basename($file['name']);
        if (move_uploaded_file($file['tmp_name'], $target_file)) {
            echo $file['name'] . " successfully uploaded.";
        } else {
            echo "some problem uploading audio files";
        }
    }
}

if ($_GET['type'] == 'newUser') {
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $sql = "INSERT IGNORE INTO users(username, password) values('$data[0]','$data[1]')";
    mysqli_query($conn, $sql) or die("oh dear! Problem adding new user\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    if (mysqli_affected_rows($conn) > 0) {
        echo json_encode("success");
    } else {
        echo json_encode("fail");
    }
}

if ($_GET['type'] == 'validateUser') {
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $sql = "SELECT * FROM users where username = '$data[0]'";
    $result = mysqli_query($conn, $sql) or die("oh dear! Problem validating user\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $msg = '';
    if (mysqli_affected_rows($conn) > 0) {
        $valid = false;
        $active = false;
        while ($row = $result->fetch_assoc()) {
            if ($row['password'] == $data[1]) {
                $valid = true;
                $active = (bool)$row['active'];
            }
        }
        $msg = $valid ? ($active ? "success" : "user pending approval") : "incorrect password";

    } else {
        $msg = "no such user";
    }
    echo json_encode($msg);
}

if($_GET['type'] == 'allocateText'){
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
    if(isset($data['userid']) && isset($data['textid'])) {
        $userid = intval($data['userid']); // Ensure it's an integer
        $textid = intval($data['textid']); // Ensure it's an integer

        $sql = "INSERT INTO `reader3`.`usertext` (`userid`, `textid`) VALUES ($userid, $textid)";
        $result = mysqli_query($conn, $sql) or die("oh dear! Problem allocating texts\n\n" . mysqli_error($conn) . "\n\n" . $sql);

        $msg = (mysqli_affected_rows($conn) > 0) ? "success" : "no records created";
    } else {
        $msg = "Invalid input data";
    }
    echo json_encode($msg);
}

if($_GET['type'] == 'allocateWordgroup'){
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
    if(isset($data['userid']) && isset($data['wordgroupid'])) {
        $userid = intval($data['userid']); // Ensure it's an integer
        $wordgroupid = intval($data['wordgroupid']); // Ensure it's an integer

        $sql = "INSERT INTO `reader3`.`lnk_student_gamegroup` (`userid`, `gamegroup_id`) VALUES ($userid, $wordgroupid)";
        $result = mysqli_query($conn, $sql) or die("oh dear! Problem allocating wordgroups\n\n" . mysqli_error($conn) . "\n\n" . $sql);

        $msg = (mysqli_affected_rows($conn) > 0) ? "success" : "no records created";
    } else {
        $msg = "Invalid input data";
    }
    echo json_encode($msg);
}

if($_GET['type'] == 'getReaders'){
    $sql = "SELECT `id`, `name`, `description`, `wordcount` FROM `reader3`.`text` ORDER BY `id` DESC";
        $result = mysqli_query($conn, $sql);
        $array = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array, $row);
        }
        echo json_encode($array);
}

if($_GET['type'] == 'getWordgroups'){
    $sql = "SELECT `id`, `group_name`, `group_desc` FROM `reader3`.`game_group` ORDER BY id DESC";
        $result = mysqli_query($conn, $sql);
        $array = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array, $row);
        }
        echo json_encode($array);
}

if($_GET['type'] == 'getWordgroup'){
    $sql = "SELECT `word`, `tranny` AS translation FROM `reader3`.`game_words` WHERE `group_id` = " . $_GET['wordgroupid'];
        $result = mysqli_query($conn, $sql);
        $array = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array, $row);
        }
        echo json_encode($array);
}

if($_GET['type'] == 'getStudentsForClass'){
    $sql = "SELECT u.user_id, u.user_email, u.user_name FROM optikon.lnk_student_class l"
    . " JOIN reader3.users u ON l.student_id = u.user_email WHERE l.class_id = " . $_GET['classid'];
    $result = mysqli_query($conn, $sql);
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
}
