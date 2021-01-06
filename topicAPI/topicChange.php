<?php
    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    // if(preg_match("/changeNumber$/", $requestURL)) {
    //     topicChangeNumber();
    // } elseif(preg_match("/changeTitle$/", $requestURL)) {
    //     topicChangeTitle();
    // } elseif(preg_match("/changeExtraInfo$/", $requestURL)) {
    //     topicChangeExtraInfo();
    // } else {
    //     echo json_encode(["error" => "URL адресът не е намерен"]);
    // }
    
    topicChange();

    function topicChange() {
        $incomingContentType = $_SERVER['CONTENT_TYPE'];
        if ($incomingContentType != 'application/json') {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 INTERNAL SERVER ERROR ');
            exit();
        }

        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);

        $topicID = isset($data["topicID"]) ? $data["topicID"] : "";
        $topicTitle = isset($data["topicTitle"]) ? $data["topicTitle"] : "";
        $topicNumber = isset($data["topicNumber"]) ? $data["topicNumber"] : "";
        $extraInfo = isset($data["extraInfo"]) ? $data["extraInfo"] : "";

        if (!$topicID) {
            $response = ["success" => false, "message" => "Липсва ID на темата!"];
        } 

        if (!$topicTitle) {
            $response = ["success" => false, "message" => "Няма въведено заглавие на тема!"];
        } 
        if (!$topicNumber) {
            $response = ["success" => false, "message" => "Няма въведен номер на тема!"];
        }
        
        if ($topicID && $topicTitle && $topicTitle) {
            $config = parse_ini_file("../config/config.ini", true);

            $host = $config['db']['host'];
            $dbname = $config['db']['name'];
            $user = $config['db']['user'];
            $password = $config['db']['password'];

            try {
                $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password, 
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

                $sql = "UPDATE topic SET title=:title WHERE topicID=:topicID";
                $statement = $connection->prepare($sql);
                $query = $statement->execute(["title" => $topicTitle, "topicID" => $topicID]);

                $all_correct = true;
                $messages = array();
                if ($query) {
                    $message = 'Заглавие: ' . $topicTitle;
                    array_push($messages, $message);
                } else {
                    $all_correct = false;
                    $message = "Възникна грешка в изпълнението на завяката Промяна на име!";
                    $response = ["success" => false, "message" => $message];
                }

                $sql = "UPDATE topic SET topicNumber=:topicNumber WHERE topicID=:topicID";
                $statement = $connection->prepare($sql);
                $query = $statement->execute(["topicNumber" => $topicNumber, "topicID" => $topicID]);

                if ($query) {
                    $message = 'Номер: ' . $topicNumber;
                    array_push($messages, $message);
                } else {
                    $all_correct = false;
                    $message = "Възникна грешка в изпълнението на завяката Промяна на номер!";
                    $response = ["success" => false, "message" => $message];
                }

                $sql = "UPDATE topic SET extraInfo=:extraInfo WHERE topicID=:topicID";
                $statement = $connection->prepare($sql);
                $query = $statement->execute(["extraInfo" => $extraInfo, "topicID" => $topicID]);

                if ($query) {
                    $message = 'Допълнителна информация: ' . $extraInfo;
                    array_push($messages, $message);
                } else {
                    $all_correct = false;
                    $message = "Възникна грешка в изпълнението на завяката Промяна на заглавие!";
                    $response = ["success" => false, "message" => $message];
                }
                if ($all_correct) {
                    $response = ["success" => true, "message" => $messages];
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