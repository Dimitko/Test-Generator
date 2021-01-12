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
        $correct = assessQuestion($question);
        $question["result"] = $correct ? "correct" : "incorrect";
      }

      return $test;
    }

    function assessQuestion($question) {
      $id = $question["id"];

      $ans_nr = 1;
      $ans_col = "option_$ans_nr";

      $correct_answer_text = executeDBQuery("SELECT `$ans_col` from question WHERE `id`=$id")[0][$ans_col];

      $selected_answer_text =  $question[$question["answer"]];


      $is_correct = $correct_answer_text === $selected_answer_text;

      return $is_correct;
    }
?>