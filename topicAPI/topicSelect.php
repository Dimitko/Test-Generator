<?php
    header("Content-type: application/json");

    topicSelectByNumber();

    function topicSelectByNumber() {
        $incomingContentType = $_SERVER['CONTENT_TYPE'];
        if ($incomingContentType != 'application/json') {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 INTERNAL SERVER ERROR ');
            exit();
        }

        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);

        $topicNumber = isset($data["topicNumber"]) ? $data["topicNumber"] : "";

        if (!$topicNumber) {
            $response = ["success" => false, "message" => "Номерът на тема е задължително поле!"];
        } else {
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
                while(($row = $result->fetch(PDO::FETCH_ASSOC)) && !$found) {
                    if ($row['topicNumber'] == $topicNumber) {
                        $topicTitle = $row['title'];
                        $extraInfo = $row['extraInfo'];
                        $found = true;
                        $message = "Избрахте тема със заглавие $topicTitle! Нейният номер е: $topicNumber и е с допълнителна информация $extraInfo";
                        $response = ["success" => true, "message" => $message];
                    }
                }

                if (!$found) {
                    $message = "Тема с номер $topicNumber не съществува! Моля опитайте отново!";
                    $response = ["success" => false, "message" => $message];
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