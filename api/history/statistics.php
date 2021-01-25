<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    function handleStatistics(){
        $request = parseRequest();

        $response = questionStatistics($request);

        echo json_encode($response);
    }

    handleStatistics();

    function questionStatistics($request){
        $question_id = $request["question_id"];
        $question_history = executeDBQuery("SELECT * FROM question_history WHERE questionID=$question_id");

        $question_stats = [
            "times_answered" => 0,
            "correct_times_answered" => 0,
            "option_1" => 0,
            "option_2" => 0,
            "option_3" => 0,
            "option_4" => 0,
        ];

        foreach ($question_history as &$occurence) {
            $question_stats["times_answered"] += 1;
            if ($occurence["correct"]) {
                $question_stats["correct_times_answered"] += 1;
            }
            $question_stats[$occurence["answered"]] += 1;
        }

        return $question_stats;

    }