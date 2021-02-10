<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/byFacultyNumber$/", $requestURL)) {
        handleHistorySelectByFacultyNumber();
    } else {
        echo json_encode(["error" => "URL адресът не е намерен"]);
    }

    function handleHistorySelectByFacultyNumber() {
        $request = parseRequest();

        $response = historySelectByFacultyNumber($request);

        echo json_encode($response);
    }

    function historySelectByFacultyNumber($request) {
        $faculty_number = isset($request["faculty_number"]) ? $request["faculty_number"] : "";

        if (!$faculty_number) {
            $response = ["success" => false, "message" => "Факултетен номер е задължителен!"];
            return $response;
        }

        $sql = "SELECT * from test_history where user_id=$faculty_number";
        $result = executeDBQuery($sql);

        if ($result) {
            $response = ["success" => true, "message" => $result];
            return $response;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }
?>