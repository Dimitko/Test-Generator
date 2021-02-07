<?php
    require("../../src/utils.php");
    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/byId$/", $requestURL)) {
        handleQuestionUpdate();
    } else {
        echo json_encode(["error" => "URL адресът не е намерен"]);
    }

    function handleQuestionUpdate() {
        $request = parseRequest();

        $response = questionUpdate($request);

        echo json_encode($response);
    }

    function questionUpdate($request) {
        $question_id = isset($request["question_id"]) ? $request["question_id"] : "";
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

        if (!$question_id) {
            $response = ["success" => false, "message" => "ID на въпрос е задължително!"];
            return $response;
        }

        if (!$aim) {
            $response = ["success" => false, "message" => "Цел на въпрос е задължителна!"];
            return $response;
        }

        if (!$question_text) {
            $response = ["success" => false, "message" => "Текст на въпрос е задължителен!"];
            return $response;
        }

        if (!$option_1) {
            $response = ["success" => false, "message" => "Опция1 на въпрос е задължителна!"];
            return $response;
        }

        if (!$option_2) {
            $response = ["success" => false, "message" => "Опция2 на въпрос е задължителна!"];
            return $response;
        }

        if (!$option_3) {
            $response = ["success" => false, "message" => "Опция3 на въпрос е задължителна!"];
            return $response;
        }

        if (!$option_4) {
            $response = ["success" => false, "message" => "Опция4 на въпрос е задължителна!"];
            return $response;
        }

        if (!$answer) {
            $response = ["success" => false, "message" => "Верен отговор на въпрос е задължителен!"];
            return $response;
        }

        if (!$difficulty) {
            $response = ["success" => false, "message" => "Трудност на въпрос е задължителна!"];
            return $response;
        }

        
        if (!$feedback_correct) {
            $response = ["success" => false, "message" => "Обратна връзка при верен отговор на въпрос е задължителна!"];
            return $response;
        }

        
        if (!$feedback_incorrect) {
            $response = ["success" => false, "message" => "Обратна връзка при грешен отговор на въпрос е задължителна!"];
            return $response;
        }

        
        if (!$notes) {
            $response = ["success" => false, "message" => "Забележки към въпрос са задължителни!"];
            return $response;
        }

        
        if (!$type) {
            $response = ["success" => false, "message" => "Тип на въпрос е задължителен!"];
            return $response;
        }

        $all_correct = true;

        $sql = "UPDATE question SET aim='$aim' WHERE id=$question_id";
        $result = insertUpdateQuery($sql);
        if(!$result) {
            $all_correct = false;
        }

        $sql = "UPDATE question SET question_text='$question_text' WHERE id=$question_id";
        $result = insertUpdateQuery($sql);
        if(!$result) {
            $all_correct = false;
        }

        $sql = "UPDATE question SET option_1='$option_1' WHERE id=$question_id";
        $result = insertUpdateQuery($sql);
        if(!$result) {
            $all_correct = false;
        }

        $sql = "UPDATE question SET option_2='$option_2' WHERE id=$question_id";
        $result = insertUpdateQuery($sql);
        if(!$result) {
            $all_correct = false;
        }

        $sql = "UPDATE question SET option_3='$option_3' WHERE id=$question_id";
        $result = insertUpdateQuery($sql);
        if(!$result) {
            $all_correct = false;
        }

        $sql = "UPDATE question SET answer='$answer' WHERE id=$question_id";
        $result = insertUpdateQuery($sql);
        if(!$result) {
            $all_correct = false;
        }

        $sql = "UPDATE question SET difficulty='$difficulty' WHERE id=$question_id";
        $result = insertUpdateQuery($sql);
        if(!$result) {
            $all_correct = false;
        }

        $sql = "UPDATE question SET feedback_correct='$feedback_correct' WHERE id=$question_id";
        $result = insertUpdateQuery($sql);
        if(!$result) {
            $all_correct = false;
        }

        $sql = "UPDATE question SET feedback_incorrect='$feedback_incorrect' WHERE id=$question_id";
        $result = insertUpdateQuery($sql);
        if(!$result) {
            $all_correct = false;
        }

        $sql = "UPDATE question SET notes='$notes' WHERE id=$question_id";
        $result = insertUpdateQuery($sql);
        if(!$result) {
            $all_correct = false;
        }

        $sql = "UPDATE question SET type='$type' WHERE id=$question_id";
        $result = insertUpdateQuery($sql);
        if(!$result) {
            $all_correct = false;
        }


        if ($all_correct) {
            $response = ["success" => true, "message" => "Успешно променихте въпрос!"];
            return $response;
        } else {
            $response = ["success" => false, "message" => "Възникна проблем!"];
            return $response;
        }
    }

?>