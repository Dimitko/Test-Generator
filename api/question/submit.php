<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    handleSubmitQuestion();

    function handleSubmitQuestion(){
        $request = parseRequest();

        $response = submitQuestion($request);
        
        echo json_encode($response);
    }

    function submitQuestion($request){
        $fn = isset($request["fn"]) ? $request["fn"] : "";
        $topic_id = isset($request["topic_id"]) ? $request["topic_id"] : "";
        $question_nr = isset($request["question_nr"]) ? $request["question_nr"] : "";
        $aim = isset($request["aim"]) ? $request["aim"] : "";
        $question_text = isset($request["question_text"]) ? $request["question_text"] : "";
        $option_1 = isset($request["option_1"]) ? $request["option_1"] : "";
        $option_2 = isset($request["option_2"]) ? $request["option_2"] : "";
        $option_3 = isset($request["option_3"]) ? $request["option_3"] : "";
        $option_4 = isset($request["option_4"]) ? $request["option_4"] : "";
        $answer = isset($request["answer"]) ? $request["answer"] : "";
        $difficulty = isset($request["difficulty"]) ? $request["difficulty"] : "";
        $feedback_correct = isset($request["feedback_correct"]) ? $request["feedback_correct"] : "";
        $feedback_incorrect = isset($request["feedback_incorrect"]) ? $request["feedback_incorrect"] : "";
        $notes = isset($request["notes"]) ? $request["notes"] : "";
        $type = isset($request["type"]) ? $request["type"] : "";

        if (!$fn) {
            $response = ["success" => false, "message" => "Факултетен номер е задължително поле!"];
            return $response;
        }

        if (!$topic_id) {
            $response = ["success" => false, "message" => "Номер на тема е задължително поле!"];
            return $response;
        }

        if (!$question_text) {
            $response = ["success" => false, "message" => "Въпросът е задължителен!"];
            return $response;
        }
        if (!$option_1) {
            $response = ["success" => false, "message" => "Отговор 1 е задължителен!"];
            return $response;
        }
        if (!$option_2) {
            $response = ["success" => false, "message" => "Отговор 2 е задължителен!"];
            return $response;
        }
        if (!$option_3) {
            $response = ["success" => false, "message" => "Отговор 3 е задължителен!"];
            return $response;
        }
        if (!$option_4) {
            $response = ["success" => false, "message" => "Отговор 4 е задължителен!"];
            return $response;
        }
        if (!$answer) {
            $response = ["success" => false, "message" => "Верен отговор е задължителен!"];
            return $response;
        }

        if (!$feedback_correct) {
            $response = ["success" => false, "message" => "Обратна връзка при верен отговор е задължителна!"];
            return $response;
        }

        if (!$feedback_incorrect) {
            $response = ["success" => false, "message" => "Обратна връзка при грешен отговор е задължителна!"];
            return $response;
        }

        $sql = "INSERT INTO question(timestamp, fn, topic_id, question_nr, aim, question_text,
        option_1, option_2, option_3, option_4, answer,
        difficulty, feedback_correct, feedback_incorrect, notes, type)
        VALUES(now(), '$fn', '$topic_id', '$question_nr', '$aim', '$question_text',
        '$option_1', '$option_2', '$option_3', '$option_4', '$answer',
        '$difficulty', '$feedback_correct', '$feedback_incorrect', '$notes', '$type')";
        $result = insertQuery($sql);

        if($result){
            $message = 'Успешно добавихте нов въпрос';
            $response = ["success" => true, "message" => $message];
            return $response;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем с вписването на въпрос!"];
            return $response;
        }
    }