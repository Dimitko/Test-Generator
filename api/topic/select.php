<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/byNumber$/", $requestURL)) {
        handleTopicSelectByNumber();
    } elseif(preg_match("/byTitle$/", $requestURL)) {
        handleTopicSelectByTitle();
    } elseif(preg_match("/byID$/", $requestURL)) {
        handleTopicSelectByID();
    } elseif(preg_match("/all$/", $requestURL)) {
        handleTopicSelectAll();
    } else {
        echo json_encode(["error" => "URL адресът не е намерен"]);
    }

    function handleTopicSelectAll() {
        $response = topicSelectAll();

        echo json_encode($response);
    }

    function handleTopicSelectByNumber() {
        $request = parseRequest();

        $response = topicSelectByNumber($request);

        echo json_encode($response);
    }

    function handleTopicSelectByID() {
        $request = parseRequest();

        $response = topicSelectByID($request);

        echo json_encode($response);
    }

    function handleTopicSelectByTitle() {
        $request = parseRequest();

        $response = topicSelectByTitle($request);

        echo json_encode($response);
    }


    function topicSelectAll() {
        $sql = "SELECT * FROM topic";
        $result = executeDBQuery($sql);

        if ($result) {
            return $result;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }

    function topicSelectByNumber($request) {
        $topicNumber = isset($request["topicNumber"]) ? $request["topicNumber"] : "";

        if (!$topicNumber) {
            $response = ["success" => false, "message" => "Номерът на тема е задължително поле!"];
            return $response;
        }

        $sql = "SELECT * FROM topic WHERE topicNumber=$topicNumber";
        $result = executeDBQuery($sql);

        if ($result) {
            return $result;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }

    function topicSelectByID($request) {
        $topicID = isset($request["topicID"]) ? $request["topicID"] : "";

        if (!$topicID) {
            $response = ["success" => false, "message" => "ID на тема е задължително поле!"];
            return $response;
        }

        $sql = "SELECT * FROM topic WHERE topicID=$topicID";
        $result = executeDBQuery($sql);

        if ($result) {
            return $result;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }

    function topicSelectByTitle($request) {
        $title = isset($request["title"]) ? $request["title"] : "";

        if (!$title) {
            $response = ["success" => false, "message" => "Заглавието на тема е задължително поле!"];
            return $response;
        }

        $sql = "SELECT * FROM topic WHERE title='$title'";
        $result = executeDBQuery($sql);

        if ($result) {
            return $result;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }
?>