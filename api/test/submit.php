<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    handleSubmitTest();

    function handleSubmitTest() {
        $request = parseRequest();

        $test_result = assessTest($request);

        echo json_encode($test_result);
    }

    function assessTest($test) {
      foreach ($test as &$question) {
        $assessment = assessQuestion($question);

        $question["result"] = $assessment["result"];
        $question["feedback"] = $assessment["feedback"];

        if (array_key_exists('correct_answer', $assessment)) {
          $question["correct_answer"] = $assessment["correct_answer"];
        }
      }

      return $test;
    }

    function assessQuestion($question) {
      $id = $question["id"];

      $ans_nr = 1;
      $ans_col = "option_$ans_nr";

      $query_result = executeDBQuery("SELECT `$ans_col`, `feedback_correct`, `feedback_incorrect`  from question WHERE `id`=$id")[0];
      $correct_answer_text = $query_result[$ans_col];

      $selected_answer_text =  $question[$question["answer"]];

      $is_correct = $correct_answer_text === $selected_answer_text;
      $feedback = $is_correct ? $query_result["feedback_correct"] : $query_result["feedback_incorrect"];

      $result = [
        "result" => $is_correct,
        "feedback" => $feedback,
      ];

      if (!$is_correct) {
        $result["correct_answer"] =  $correct_answer_text;
      }

      return $result;
    }
?>