<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/byId$/", $requestURL)) {
        handleQuestionDelete();
    } else {
        echo json_encode(["error" => "URL адресът не е намерен"]);
    }

    function handleQuestionDelete() {
        $request = parseRequest();

        $response = questionDelete($request);

        echo json_encode($response);
    }

    function questionDelete($request) {
        $question_id = isset($request["question_id"]) ? $request["question_id"] : "";

        if (!$question_id) {
            $response = ["success" => false, "message" => "ID на въпрос е задължително!"];
            return $response;
        }

        $sql = "DELETE FROM question WHERE id=$question_id";
        $result = insertUpdateQuery($sql);

        if ($result) {
            return $result;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }

?>