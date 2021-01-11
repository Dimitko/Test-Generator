<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    handleMakeTest();

    function handleMakeTest() {
        $request = parseRequest();
        $questions = makeTest($request);
        $response = buildTestWithQuestion($questions);

        echo json_encode($response);
    }

    function makeTest($request) {
        $topicNumber = isset($request["topicNumber"]) ? $request["topicNumber"] : "";

        if ($topicNumber === "") {
            $response = ["success" => false, "message" => "Номерът на тема е задължително поле!"];
            return $response;
        }

        $topic_id = "";
        $topic_id = executeDBQuery("SELECT topicID FROM topic WHERE topicNumber=$topicNumber")[0]["topicID"];

        if ($topic_id == NULL) {
            $message = "Тема с номер $topicNumber не съществува! Моля опитайте отново!";
            $response = ["success" => false, "message" => $message];
            return $response;
        }

        $questions = executeDBQuery("SELECT * FROM question WHERE topic_id=$topic_id");

        if (!$questions) {
            return [];
        }

        return $questions;
    }

    function buildTestWithQuestion($questions)
    {
        $result = array();

        foreach ($questions as &$q) {
            $nq = [
                "question_text" => $q["question_text"],
                "id" => $q["id"],
                "option_1" => $q["option_1"],
                "option_2" => $q["option_2"],
                "option_3" => $q["option_3"],
                "option_4" => $q["option_4"],
            ];

            $result[] = $nq;
        }
        return $result;
    }

?>