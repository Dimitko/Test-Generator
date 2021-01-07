<?php
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

      $config = parse_ini_file("../../config/config.ini", true);

      $host = $config['db']['host'];
      $dbname = $config['db']['name'];
      $user = $config['db']['user'];
      $password = $config['db']['password'];

      $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password,
      array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

      $ans_nr = 1;
      $ans_col = "option_$ans_nr";


      $sql = "SELECT `$ans_col` from question WHERE `id`=$id";
      $result = $connection->query($sql);
      $correct_answer_text = $result->fetch(PDO::FETCH_ASSOC)[$ans_col];
      $selected_answer_text =  $question[$question["answer"]];


      $is_correct = $correct_answer_text === $selected_answer_text;

      return $is_correct;
    }

    function makeTest() {
        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);

        $topicNumber = isset($data["topicNumber"]) ? $data["topicNumber"] : "";

        if ($topicNumber === "") {
            echo gettype($topicNumber);
            $response = ["success" => false, "message" => "Номерът на тема е задължително поле!"];
            return $response;
        }

        $config = parse_ini_file("../../config/config.ini", true);

        $host = $config['db']['host'];
        $dbname = $config['db']['name'];
        $user = $config['db']['user'];
        $password = $config['db']['password'];

        $topic_id = "";

        try {
            $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password,
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));



            $sql = "SELECT topicID FROM topic WHERE topicNumber=$topicNumber";
            $result = $connection->query($sql);

            $topic_id = $result->fetch(PDO::FETCH_ASSOC)["topicID"];

            if ($topic_id === NULL) {
                $message = "Тема с номер $topicNumber не съществува! Моля опитайте отново!";
                $response = ["success" => false, "message" => $message];
                return $response;
            }
        }
        catch(PDOException $e) {
            $message = $e->getMessage();
            $response = ["success" => false, "message" => $message];
            return $response;
        }


        try {
            $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password,
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));


            $sql = "SELECT * FROM question WHERE topic_id=$topic_id";
            $result = $connection->query($sql);

            $questions = $result->fetchAll(PDO::FETCH_ASSOC);

            if (!$questions) {
                $message = "Няма въпроси за тази тема";
                $response = ["success" => false, "message" => $message];
                return $response;
            }
        }
        catch(PDOException $e) {
            $message = $e->getMessage();
            $response = ["success" => false, "message" => $message];
            return $response;
        }


        return $questions;
    }

    function buildTestWithQuestion($questions)
    {
        $result = array();

        foreach ($questions as &$q) {
            $nq = [
                "question_text" => $q["question_text"],
                "question_id" => $q["id"],
                "option_1" => $q["option_1"],
                "option_2" => $q["option_2"],
                "option_3" => $q["option_3"],
                "option_4" => $q["option_4"],
            ];

            $result[] = $nq;
        }
        return $result;
    }
