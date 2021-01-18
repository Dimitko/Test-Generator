<?php

function executeDBQuery($query) {
  $INI_FILE_DIR = realpath(__DIR__ . DIRECTORY_SEPARATOR . "../config/config.ini");
  $config = parse_ini_file($INI_FILE_DIR, true);

  $host = $config['db']['host'];

  $dbname = $config['db']['name'];
  $user = $config['db']['user'];
  $password = $config['db']['password'];

  try {
    $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password,
    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

    $result = $connection->query($query);
    return $result->fetchAll(PDO::FETCH_ASSOC);

  } catch(PDOException $e) {
      $message = $e->getMessage();
      echo $message;
      throw $e;
  }
}

function insertTopicQuery($query) {
  $INI_FILE_DIR = realpath(__DIR__ . DIRECTORY_SEPARATOR . "../config/config.ini");
  $config = parse_ini_file($INI_FILE_DIR, true);

  $host = $config['db']['host'];

  $dbname = $config['db']['name'];
  $user = $config['db']['user'];
  $password = $config['db']['password'];

  try {
    $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password,
    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

    $insertTopicStatement = $connection->prepare($query);

    $result = $insertTopicStatement->execute();

    return $result;
  }
  catch(PDOException $e) {
        $message = $e->getMessage();
        echo $message;
        throw $e;
  }
}

function parseRequest() {
  $incomingContentType = $_SERVER['CONTENT_TYPE'];
  if ($incomingContentType != 'application/json') {
      header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request ');
      echo "Request format must be json!";
      exit();
  }

  $content = trim(file_get_contents("php://input"));
  $request = json_decode($content, true);

  return $request;
}



?>