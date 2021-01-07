<?php
    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/byNumber$/", $requestURL)) {
        topicSelectByNumber();
    } elseif(preg_match("/byTitle$/", $requestURL)) {
        topicSelectByTitle();
    } elseif(preg_match("/byID$/", $requestURL)) {
        topicSelectByID();
    } elseif(preg_match("/all$/", $requestURL)) {
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
            $config = parse_ini_file("../../config/config.ini", true);

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

    function topicSelectByID() {
        $incomingContentType = $_SERVER['CONTENT_TYPE'];
        if ($incomingContentType != 'application/json') {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 INTERNAL SERVER ERROR ');
            exit();
        }

        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);

        $topicID = isset($data["topicID"]) ? $data["topicID"] : "";

        if (!$topicID) {
            $response = ["success" => false, "message" => "ID на тема е задължително поле!"];
        } else {
            $config = parse_ini_file("../../config/config.ini", true);

            $host = $config['db']['host'];
            $dbname = $config['db']['name'];
            $user = $config['db']['user'];
            $password = $config['db']['password'];

            try {
                $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

                $sql = "SELECT * FROM topic WHERE topicID=$topicID";
                $result = $connection->query($sql);

                $topic = $result->fetch(PDO::FETCH_ASSOC);

                if (!$topic) {
                    $message = "Тема с ID $topicID не съществува! Моля опитайте отново!";
                    $response = ["success" => false, "message" => $message];
                } else {
                    $response = ["success" => true, "message" => $topic];
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
        $config = parse_ini_file("../../config/config.ini", true);

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
            $config = parse_ini_file("../../config/config.ini", true);

            $host = $config['db']['host'];
            $dbname = $config['db']['name'];
            $user = $config['db']['user'];
            $password = $config['db']['password'];

            try {
                $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

                $sql = "SELECT * FROM topic WHERE title='?'";
                $result = $connection->query($sql);

                $found = false;
                $countTopics = 0;
                $topics = array();
                while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    if ($row['title'] === $topicTitle) {
                        $countTopics++;
                        $topicNumber = $row['topicNumber'];
                        $extraInfo = $row['extraInfo'];
                        $found = true;
                        $topic = ["title" => $topicTitle, "topicNumber" => $topicNumber, "extraInfo" => $extraInfo];
                        array_push($topics, $topic);
                    }
                }

                if (!$found) {
                    $message = "Тема с това заглавие не съществува!";
                    $response = ["success" => false, "message" => $message];
                } else {
                    $response = ["success" => true, "numberOfTopicsWithThisTitle" => $countTopics, "message" => $topics];
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