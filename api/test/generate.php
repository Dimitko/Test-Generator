<?php
    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    handleMakeTest();

    function handleMakeTest() {
        $incomingContentType = $_SERVER['CONTENT_TYPE'];
        if ($incomingContentType != 'application/json') {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 INTERNAL SERVER ERROR ');
            exit();
        }

        $questions = makeTest();
        $response = buildTestWithQuestion($questions);

        echo json_encode($response);
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