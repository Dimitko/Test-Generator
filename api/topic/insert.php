<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    handleTopicInsert();

    function handleTopicInsert() {
        $request = parseRequest();

        $response = topicInsert($request);

        echo json_encode($response);
    }

    function topicInsert($request) {
        $title = isset($request["title"]) ? $request["title"] : "";
        $topicNumber = isset($request["topicNumber"]) ? $request["topicNumber"] : "";
        $extraInfo = isset($request["extraInfo"]) ? $request["extraInfo"] : " ";

        if (!$title) {
            $response = ["success" => false, "message" => "Заглавието на тема е задължително поле!"];
            return $response;
        }

        if (!$topicNumber) {
            $response = ["success" => false, "message" => "Номерът на тема е задължително поле!"];
            return $response;
        }

        $sql = "INSERT INTO topic(title, topicNumber, extraInfo) VALUES ('$title', '$topicNumber', '$extraInfo')";
        $result = insertUpdateQuery($sql);

        if ($result) {
            $message = 'Успешно добавихте тема със заглавие' . ' ' . $title;
            $response = ["success" => true, "message" => $message];
            return $response;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем с вписването на темата!"];
            return $response;
        }
    }