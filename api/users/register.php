<?php
    require("../../src/utils.php");
    session_start();
    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    handleUserRegister();

    function handleUserRegister() {
        $request = parseRequest();

        $response = userRegister($request);

        echo json_encode($response);
    }

    function userRegister($request) {
        $faculty_number = $request["faculty_number"];
        $topic_number = $request["topic_number"];
        $user_key = $request["user_key"];
        $role = $request["role"];

        $sql = "SELECT * FROM topic WHERE topicNumber='$topic_number'";
        $result = executeDBQuery($sql);

        $topicID = $result[0]['topicID'];

        $sql = "INSERT INTO users(facultyNr, topicID, role, user_key) VALUES ('$faculty_number', '$topicID', '$role', '$user_key')";
        $result = insertUpdateQuery($sql);

        if ($result) {
            $message = 'Успешно регистрирахте потребител с факултетен номер' . ' ' . $faculty_number;
            $response = ["success" => true, "message" => $message];
            return $response;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем с вписването на темата!"];
            return $response;
        }
    }

?>