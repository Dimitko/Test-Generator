<?php
    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/byNumber$/", $requestURL)) {
        topicSelectByNumber();
    } elseif(preg_match("/byTitle$/", $requestURL)) {
        topicSelectByTitle();
    }  elseif(preg_match("/all$/", $requestURL)) {
        selectAll();
    } else {
        echo json_encode(["error" => "URL адресът не е намерен"]);
    }

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

                $sql = "SELECT * FROM topic WHERE topicNumber=$topicNumber";
                $result = $connection->query($sql);

                $topic = $result->fetch(PDO::FETCH_ASSOC);

                if (!$topic) {
                    $message = "Тема с номер $topicNumber не съществува! Моля опитайте отново!";
                    $response = ["success" => false, "message" => $message];
                } else {
                    $topicTitle = $topic['title'];
                    $extraInfo = $topic['extraInfo'];
                    $message = "Избрахте тема със заглавие $topicTitle! Нейният номер е: $topicNumber и е с допълнителна информация $extraInfo";
                    $response = ["success" => true, "message" => $message];
                }
            }
            catch(PDOException $e) {
                $message = $e->getMessage();
                $response = ["success" => false, "message" => $message];
            }
         } 
        echo json_encode($response);
    }

    function selectAll() {
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
            $res = $result->fetchAll(PDO::FETCH_ASSOC);

            $response = ["success" => true, "message" => $res];
        }
        catch(PDOException $e) {
            $message = $e->getMessage();
            $response = ["success" => false, "message" => $message];
        }
        echo json_encode($response);
     } 




    function topicSelectByTitle() {
        $incomingContentType = $_SERVER['CONTENT_TYPE'];
        if ($incomingContentType != 'application/json') {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 INTERNAL SERVER ERROR ');
            exit();
        }

        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);

        $topicTitle = isset($data["title"]) ? $data["title"] : "";

        if (!$topicTitle) {
            $response = ["success" => false, "message" => "Заглавието на тема е задължително поле!"];
        } else {
            $config = parse_ini_file("../config/config.ini", true);

            $host = $config['db']['host'];
            $dbname = $config['db']['name'];
            $user = $config['db']['user'];
            $password = $config['db']['password'];

            try {
                $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password, 
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

                $sql = "SELECT * FROM topic WHERE title='Topic9'";              
                $result = $connection->query($sql);
                if ($result) {
                    $topic = $result->fetch(PDO::FETCH_ASSOC);
                    if (!$topic) {
                        $message = "Тема със заглавие $topicTitle не съществува! Моля опитайте отново!";
                        $response = ["success" => false, "message" => $message];
                    } else {
                        $topicNumber = $topic['topicNumber'];
                        $extraInfo = $topic['extraInfo'];
                        $message = "Избрахте тема със заглавие $topicTitle! Нейният номер е: $topicNumber и е с допълнителна информация $extraInfo";
                        $response = ["success" => true, "message" => $message];
                    }
                } else {
                    $message = "Грешка в извличането!";
                    $response = ["success" => false, "message" => $message];
                }


                // $countTopics = 0;
                // $topics = array();

                // while($topic = $result->fetch(PDO::FETCH_ASSOC)) {
                //     $countTopics++;
                //     $topicNumber = $topic['topicNumber'];
                //     $extraInfo = $topic['extraInfo'];
                //     $currentTopic = ["title" => $topicTitle, "topicNumber" => $topicNumber, "extraInfo" => $extraInfo];
                //     array_push($topics, $currentTopic);
                // }

                // if ($countTopics == 0) {
                //     $message = "Теми със заглавие $topicTitle не съществуват! Моля опитайте отново!";
                //     $response = ["success" => false, "message" => $message];
                // } else {
                //     $response = ["success" => true, "numberOfTopics" => $countTopics, "message" => $topics];
                // }
           }
            catch(PDOException $e) {
                $message = $e->getMessage();
                $response = ["success" => false, "message" => $message];
            }
         } 
        echo json_encode($response);
    }
?>