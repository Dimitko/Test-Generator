<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/byNumber$/", $requestURL)) {
        handleTopicDelete();
    } else {
        echo json_encode(["error" => "URL адресът не е намерен"]);
    }

    function handleTopicDelete() {
        $request = parseRequest();

        $response = topicDelete($request);

        echo json_encode($response);
    }

    function topicDelete($request) {
        $topicNumber = isset($request["topicNumber"]) ? $request["topicNumber"] : "";

        if (!$topicNumber) {
            $response = ["success" => false, "message" => "Номерът на тема е задължителен!"];
            return $response;
        }

        $sql = "DELETE FROM topic WHERE topicNumber=$topicNumber";
        $result = insertUpdateQuery($sql);

        if ($result) {
            return $result;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }

?>