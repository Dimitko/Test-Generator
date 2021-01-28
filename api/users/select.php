<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/all$/", $requestURL)) {
        handleUserSelectAll();
    } else {
        echo json_encode(["error" => "URL адресът не е намерен"]);
    }

    function handleUserSelectAll() {
        $response = userSelectAll();

        echo json_encode($response);
    }

    function userSelectAll() {
        $sql = "SELECT * FROM users ORDER BY facultyNr";
        $result = executeDBQuery($sql);

        if ($result) {
            return $result;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }

?>