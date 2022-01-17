<?php
include "sessionheader.inc";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

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


if ($_GET['type'] == "questions") {

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    foreach ($data as $el) {
        $sql = "insert into tbl_questions (test_id, qnum, text1, text2, text3, text4, text5, text6, text7, answer, type, rubrik, image, audio, video) values (
    $el->testid, $el->qnum, \"$el->text1\", \"$el->text2\", \"$el->text3\", \"$el->text4\", \"$el->text5\", \"$el->text6\", \"$el->text7\", \"$el->answer\",
    \"$el->type\", \"$el->rubrik\", \"$el->image\", \"$el->audio\", \"$el->video\")";
//     echo $sql;
        mysqli_query($conn, $sql) or die("hey! Cannot add question " . mysqli_error($conn));
    }
    echo "success";
}
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
