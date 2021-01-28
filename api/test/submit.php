<?php
    require("../../src/utils.php");

    header("Content-type: application/json");
    session_start();

    $requestURL = $_SERVER["REQUEST_URI"];

    handleSubmitTest();

    function handleSubmitTest() {
        $request = parseRequest();

        $test_result = assessTest($request);

        echo json_encode($test_result);
    }

    function assessTest($test) {
      $time = time();
      $correct = 0;
      $total = 0;

      foreach ($test as &$question) {
        $assessment = assessQuestion($question, $time);

        $question["result"] = $assessment["result"];
        $question["feedback"] = $assessment["feedback"];

        if (array_key_exists('correct_answer', $assessment)) {
          $question["correct_answer"] = $assessment["correct_answer"];
        }

        if ($assessment["result"]) {
          $correct++;
        }

        $total++;
      }



      updateTestHistory($test, $time, $correct, $total);

      return $test;
    }

    function assessQuestion($question, $time) {
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

      updateHistory($id, $question["answer"], $is_correct, $time);

      return $result;
    }

    function updateHistory($question_id, $answered, $is_correct, $time)  {
      if (!isset($_SESSION["faculty_number"])) {
        error_log("Not logged in for history");
        return;
      }

      // temporary workaround as PHP parses 0 as an empty string;
      if ($is_correct) {
        $is_correct = '1';
      } else {
        $is_correct ='0';
      }

      $fn = $_SESSION["faculty_number"];
      $db_columns = 'questionID, userID, answered, correct, timestamp';
      $query = "INSERT INTO question_history($db_columns) VALUES ('$question_id', '$fn', '$answered', $is_correct, '$time')";
      insertUpdateQuery($query);
    }

    function updateTestHistory($test, $time, $correct, $total)  {
      $fn = $_SESSION["faculty_number"];
      $first_question_id = $test[0]["id"];
      $topic_id = executeDBQuery("SELECT `topic_id`  from question WHERE `id`=$first_question_id")[0]["topic_id"];
      $db_columns = 'user_id, topic_id, timestamp, score';
      $timestamp = date("Y-m-d H:i:s", $time);
      $score_string = $correct . '/' . $total;
      $query = "INSERT INTO test_history($db_columns) VALUES ('$fn', '$topic_id', '$timestamp', '$score_string')";
      insertUpdateQuery($query);
    }
?>