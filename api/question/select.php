<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/byTopicAndType$/", $requestURL)) {
        handleQuestionSelectByTopicAndType();
    } elseif(preg_match("/byTopicNumber$/", $requestURL)) {
        handleQuestionSelectByTopicNumber();
    } elseif(preg_match("/all$/", $requestURL)) {
        handleQuestionSelectAll();
    } else {
        echo json_encode(["error" => "URL адресът не е намерен"]);
    }


    function handleQuestionSelectAll() {
        $response = questionSelectAll();

        echo json_encode($response);
    }

    function handleQuestionSelectByTopicNumber() {
        $request = parseRequest();

        $response = questionSelectByTopicNumber($request);

        echo json_encode($response);
    }

    function handleQuestionSelectByTopicAndType() {
        $request = parseRequest();

        $response = questionSelectByTopicAndType($request);

        echo json_encode($response);
    }


    function questionSelectAll() {
        $sql = "SELECT * FROM question ORDER BY question_nr";
        $result = executeDBQuery($sql);

        if ($result) {
            return $result;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }

    function questionSelectByTopicNumber($request) {
        $topicNumber = isset($request["topicNumber"]) ? $request["topicNumber"] : "";

        if (!$topicNumber) {
            $response = ["success" => false, "message" => "Номерът на тема е задължително поле!"];
            return $response;
        }

        $sql = "SELECT question.* FROM question INNER join topic on topic.topicID=question.topic_id WHERE topic.topicNumber=$topicNumber";
        $result = executeDBQuery($sql);

        if ($result) {
            return $result;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }

    function questionSelectByTopicAndType($request) {
        $topicNumber = isset($request["topicNumber"]) ? $request["topicNumber"] : "";
        $type = isset($request["type"]) ? $request["type"] : "";

        if (!$topicNumber) {
            $response = ["success" => false, "message" => "Номерът на тема е задължително поле!"];
            return $response;
        }

        if (!$type) {
            $response = ["success" => false, "message" => "Типът на въпроса е задължително поле!"];
            return $response;
        }

        $sql = "SELECT question.* FROM question INNER join topic on topic.topicID=question.topic_id WHERE topic.topicNumber=$topicNumber AND question.type=$type";
        $result = executeDBQuery($sql);

        if ($result) {
            return $result;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }
?>