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

        $oldTopicNumber = isset($data["oldTopicNumber"]) ? $data["oldTopicNumber"] : "";
        $oldTopicTitle = isset($data["oldTopicTitle"]) ? $data["oldTopicTitle"] : "";
        $newTopicNumber = isset($data["newTopicNumber"]) ? $data["newTopicNumber"] : $oldTopicNumber;
        $newTopicTitle = isset($data["newTopicTitle"]) ? $data["newTopicTitle"] : $oldTopicTitle;

        if (!$oldTopicNumber) {
            $response = ["success" => false, "message" => "Няма зададен досегашен номер на тема!"];
        } 
        if (!$oldTopicTitle) {
            $response = ["success" => false, "message" => "Няма зададено досегашно заглавие на темата!"];
        }
        
        if ($oldTopicNumber && $oldTopicTitle) {
            $config = parse_ini_file("../config/config.ini", true);

            $host = $config['db']['host'];
            $dbname = $config['db']['name'];
            $user = $config['db']['user'];
            $password = $config['db']['password'];

            try {
                $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password, 
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

                $sql = "UPDATE topic SET title=:title WHERE topicNumber=:topicNumber";
                $statement = $connection->prepare($sql);
                $query = $statement->execute(["title" => $newTopicTitle, "topicNumber" => $oldTopicNumber]);

                $sql = "UPDATE topic SET topicNumber=:topicNumber WHERE title=:title";
                $statement = $connection->prepare($sql);
                $query = $statement->execute(["topicNumber" => $newTopicNumber, "title" => $newTopicTitle]);
                if ($query) {
                    $message = 'Заглавие ' . $newTopicTitle . ' номер ' . $newTopicNumber;
                    $response = ["success" => true, "message" => $message];
                } else {
                    $message = "Възникна грешка в изпълнението на завяката!";
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