<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/byFacultyNr$/", $requestURL)) {
        handleUserDelete();
    } else {
        echo json_encode(["error" => "URL адресът не е намерен"]);
    }

    function handleUserDelete() {
        $request = parseRequest();

        $response = userDelete($request);

        echo json_encode($response);
    }

    function userDelete($request) {
        $facultyNr = isset($request["facultyNr"]) ? $request["facultyNr"] : "";

        if (!$facultyNr) {
            $response = ["success" => false, "message" => "Факултетен номер е задължителен!"];
            return $response;
        }

        $sql = "DELETE FROM users WHERE facultyNr=$facultyNr";
        $result = insertUpdateQuery($sql);

        if ($result) {
            return $result;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }

?>