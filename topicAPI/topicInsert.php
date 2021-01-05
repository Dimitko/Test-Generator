<?php

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    // if(preg_match("/topicInsert$/", $requestURL)) {
    //     topicInsert();
    // } else {
    //     echo json_encode(["error" => "URL адресът не е намерен"]);
    // }
    
    topicInsert(); 
     
    function topicInsert() {
        $incomingContentType = $_SERVER['CONTENT_TYPE'];
        if ($incomingContentType != 'application/json') {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 INTERNAL SERVER ERROR ');
            exit();
        }

        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);

        $title = isset($data["title"]) ? $data["title"] : "";
        $topicNumber = isset($data["topicNumber"]) ? $data["topicNumber"] : "";
        $extraInfo = isset($data["extraInfo"]) ? $data["extraInfo"] : " ";

        if (!$title) {
            $response = ["success" => false, "message" => "Заглавието на тема е задължително поле!"];
        }

        if (!$topicNumber) {
            $response = ["success" => false, "message" => "Номерът на тема е задължително поле!"];
        }

        if ($title && $topicNumber) {
            $config = parse_ini_file("../config/config.ini", true);

            $host = $config['db']['host'];
            $dbname = $config['db']['name'];
            $user = $config['db']['user'];
            $password = $config['db']['password'];

            try {
                $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password, 
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

                $sql = "SELECT * FROM topic";
                $result = $connection->query($sql);

                $found = false;
                while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    if ($row['title'] === $title) {
                        $existingTopicNumber = $row['topicNumber'];
                        $found = true;
                        $message = "Тема с това заглавие вече съществува! Нейният номер е: $existingTopicNumber";
                        $response = ["success" => false, "message" => $message];
                    }
                }

               if (!$found) {
                    $sql = "INSERT INTO topic(title, topicNumber, extraInfo) VALUES (:title, :topicNumber, :extraInfo)";
                    $insertTopicStatement = $connection->prepare($sql);

                    try {
                        $insertTopicStatement->execute(["title" => $title, "topicNumber" => $topicNumber, "extraInfo" => $extraInfo]);
                        $message = 'Успешно добавихте тема със заглавие' . ' ' . $title . ' с номер' . $topicNumber . ' и допълнителна информация: ' . $extraInfo;
                        $response = ["success" => true, "message" => $message];
                    } catch(PDOException $e) {
                        $message = $e->getMessage();
                        $response = ["success" => false, "message" => $message];
                    }
               } 
            }
            catch(PDOException $e) {
                $message = $e->getMessage();
                $response = ["success" => false, "message" => $message];
            }
         } 
        
        echo json_encode($response);
    }
?>