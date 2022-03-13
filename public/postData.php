<?php
include "sessionheader.inc";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// ############   STUDENTS   ############
if ($_GET['type'] == "students") {
    $sql = "SELECT * FROM optikon.tbl_students";
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
    $msg = "student ";

    if ($_GET['isEdit'] == 'yes') {
        $msg .= "updated";
        $sql = "update tbl_students set name = '$data->name', DOB ='$data->DOB'
        ,sex = '$data->sex'
        ,mobile = '$data->mobile'
        ,email = '$data->email'
        ,notes = '$data->notes'
        ,picUrl ='$data->picUrl'
        ,language_id = '$data->language_id'
        ,join_date = '$data->join_date'
        ,last_active_date = '$data->last_active_date'
        ,isActive = $data->isActive
        ,guardian_name = '$data->guardianName'
        ,guardian_mobile ='$data->guardianMobile'
        where id='$data->id'";
    } else {
        $sql = "insert into tbl_students(id, name, DOB, sex, mobile, email, notes, picUrl, language_id, join_date, last_active_date, isActive, guardian_name, guardian_mobile) VALUES(\"" .
            $data->id . "\",\"" .
            $data->name . "\",\"" .
            $data->DOB . "\",\"" .
            $data->sex . "\",\"" .
            $data->mobile . "\",\"" .
            $data->email . "\",\"" .
            $data->notes . "\",\"" .
            $data->picUrl . "\",\"" .
            $data->language_id . "\",\"" .
            $data->join_date . "\",\"" .
            $data->last_active_date . "\"," .
            $data->isActive . ",\"" .
            $data->guardianName . "\",\"" .
            $data->guardianMobile . "\")";
        $msg .= "added";
    }

    mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

    print $msg;
}

if ($_GET['type'] == 'delStud') {
    header("Access-Control-Allow-Methods: DELETE");
    $sql = "delete from tbl_students where id='" . $_GET['studid'] . "'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting student\n\n" . mysqli_error($conn) . "\n\n" . $sql);

    $sql = "delete from lnk_student_class where student_id='" . $_GET['studid'] . "'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting student\n\n" . mysqli_error($conn) . "\n\n" . $sql);

    echo "deleted";
}

// ############   TESTS   ############
if ($_GET['type'] == "tests") {
    $sql = "SELECT * FROM optikon.tbl_tests order by id desc";
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
    $msg = "test ";

    if ($_GET['isEdit'] == 'yes') {
        $msg .= "updated";
        $sql = "update tbl_tests set
        name = '$data->name'
        ,description ='$data->description'
        ,print_wrong = '$data->print_wrong'
        ,print_answer = '$data->print_answer'
        ,oneshot = '$data->oneshot'
        ,retain ='$data->retain'
        ,timer = '$data->timer'
        where id='$data->id'";
    } else {
        $sql = "insert into tbl_tests(name, description, print_wrong, print_answer, oneshot, retain, timer) VALUES(\"" .
            $data->name . "\",\"" .
            $data->description . "\"," .
            $data->print_wrong . "," .
            $data->print_answer . "," .
            $data->oneshot . "," .
            $data->retain . "," .
            $data->timer . ")";
        $msg .= "added";
    }

    mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

    print $msg;
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
    $sql = "SELECT * FROM optikon.tbl_classes";
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
        $sql = "insert into tbl_classes(name, comment, session_start, session_end) VALUES(\"" .
            $data->name . "\",\"" .
            $data->comment . "\",\"" .
            $data->session_start . "\",\"" .
            $data->session_end . "\")";
    }

    mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

    print $msg;
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
on bob.class_id = tbl_classes.id order by start desc";
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
        $sql = "insert into lnk_class_test(class_id, test_id, start, finish) VALUES(\"" .
            $data->classid . "\",\"" .
            $data->testid . "\",\"" .
            $data->start . "\",\"" .
            $data->finish . "\")";
    }

    mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);

    print $msg;
}

if ($_GET['type'] == 'delTestAlloc') {
    header("Access-Control-Allow-Methods: DELETE");
    $sql = "delete from lnk_class_test where test_id='{$_GET['testid']}' and class_id='{$_GET['classid']}'";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting class test allocation\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "delete from tbl_testscore where test_id='{$_GET['testid']}' and student_id in "
        . "(SELECT student_id FROM lnk_class_test join lnk_student_class on lnk_class_test.class_id = lnk_student_class.class_id "
        . "where lnk_class_test.class_id='{$_GET['classid']}' and lnk_class_test.test_id='{$_GET['testid']}')";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting from tbl_testscore for class allocation\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    $sql = "delete from tbl_responses where test_id='{$_GET['testid']}' and student_id in "
        . "(SELECT student_id FROM lnk_class_test join lnk_student_class on lnk_class_test.class_id = lnk_student_class.class_id "
        . "where lnk_class_test.class_id='{$_GET['classid']}' and lnk_class_test.test_id='{$_GET['testid']}')";
    mysqli_query($conn, $sql) or die("oh dear! Problem deleting from tbl_responses for class allocation\n\n" . mysqli_error($conn) . "\n\n" . $sql);
    echo "tbl_testscores and tbl_responses successfully removed for the given test allocation";
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
    $sql = "SELECT * FROM optikon.tbl_questions where test_id={$_GET['testid']}";
    $result = mysqli_query($conn, $sql) or die("error in getting questions" . mysqli_error($conn));
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
    exit;
}

if ($_GET['type'] == "imagesForTest") {
    $path = "/var/www/html/optikon/images/";
    $sql = "SELECT image FROM optikon.tbl_questions where test_id={$_GET['testid']}";
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

        $sql = "INSERT INTO tbl_questions (test_id, qnum, text1, text2, text3, text4, text5, text6, text7, answer, type, rubrik, image, audio, video) VALUES ("
            . "{$data->test_id}, {$data->qnum}, '{$data->text1}', '{$data->text2}', '{$data->text3}', '{$data->text4}', '{$data->text5}', '{$data->text6}', "
            . "'{$data->text7}', '{$data->answer}', '{$data->type}', '{$data->rubrik}', '{$data->image}', '{$data->audio}', '{$data->video}')";
    }
    echo $sql;
    mysqli_query($conn, $sql) or die("hey! Cannot add question " . mysqli_error($conn));
    print $msg;
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
        $sql = "insert into lnk_student_class(student_id, class_id, begin, end) VALUES(\"" .
            $data->studid . "\",\"" .
            $data->classid . "\",\"" .
            $data->begin . "\",\"" .
            $data->end . "\")";
    }
    mysqli_query($conn, $sql) or die("woah!" . mysqli_error($conn) . "\n\n" . $sql);
    print $msg;
}
if ($_GET['type'] == "studAllocs") {
    $sql = "select bob.student_id as studid, bob.name as studName, bob.class_id as classid, tbl_classes.name as className, " .
        "tbl_classes.comment, bob.begin, bob.end from tbl_classes join " .
        "(SELECT lnk_student_class.*, tbl_students.name FROM optikon.lnk_student_class join tbl_students " .
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
    select id, name, oneshot, score from tbl_tests join
    (select valid_tests.student_id, valid_tests.test_id, score from tbl_testscore
    right join
    (select student_id, test_id from
    (select test_id, start from lnk_class_test where class_id=" . $_GET['classid'] . ") as classTests
    join
    (select student_id, begin, end from lnk_student_class where student_id='" . $_GET['studid'] . "' and class_id=" . $_GET['classid'] . ")
    as studentDates
    where start > begin and start < end) as valid_tests
    on tbl_testscore.student_id = valid_tests.student_id and tbl_testscore.test_id = valid_tests.test_id)
    AS scores_for_student
    on tbl_tests.id = scores_for_student.test_id
    order by oneshot, score";
    $result = mysqli_query($conn, $sql);
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
}

if ($_GET['type'] == "languages") {
    $sql = "SELECT * FROM optikon.tbl_language";
    $result = mysqli_query($conn, $sql);
    $array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($array, $row);
    }
    echo json_encode($array);
}

if($_GET['type'] ==  'imgUpload'){
    $target_dir = "/var/www/html/optikon/images/";
    foreach ($_FILES as $file){
//        echo $file['name'] . $file['type'] . $file['size'];
        $target_file = $target_dir . basename($file['name']);
        if(move_uploaded_file($file['tmp_name'], $target_file)){
            echo $file['name'] . " successfully uploaded.";
        } else{
            echo "some problem uploading files";
        }
    }
}
