<?php
       require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    handleSubmitTest();

    function handleSubmitTest() {
        $incomingContentType = $_SERVER['CONTENT_TYPE'];
        if ($incomingContentType != 'application/json') {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 INTERNAL SERVER ERROR ');
            exit();
        }

        $test_result = assessTest();


        echo json_encode($test_result);
    }

    function assessTest() {
      $content = trim(file_get_contents("php://input"));
      $test = json_decode($content, true);

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
      $correct_answer_text = executeDBQuery("SELECT `$ans_col` from question WHERE `id`=$id")[$ans_col];

      $selected_answer_text =  $question[$question["answer"]];

      $is_correct = $correct_answer_text === $selected_answer_text;

      return $is_correct;
    }
?>