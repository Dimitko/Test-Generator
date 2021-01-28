<?php
session_start();

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

function insertUpdateQuery($query) {
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


function redirectToLogin() {
  header("Location: http://localhost/Test-Generator/pages/LoginForm.html");
}

function checkLoggedIn() {
  if (isset($_COOKIE["faculty_number"])) {
      // error_log("cookie is set");
      $faculty_number = $_COOKIE["faculty_number"];
      $query = "SELECT expires from sessions where sessionID=$faculty_number";
      $result = executeDBQuery($query);
      if (count($result) == 0) {
        // error_log("unknown cookie");
        return ["logged_in" => false];
      }

      $expires = strtotime($result[0]["expires"]);
      if (time() > $expires) {
        // error_log("expired logged in");
        clearSessions($faculty_number);
        return ["logged_in" => false];
      }

      $_SESSION["faculty_number"] = $faculty_number;
      // error_log("logged in");
      return ["logged_in" => true, "faculty_number" => $faculty_number];
  } else {
    // error_log("no cookie");
    return ["logged_in" => false];
  }
}

function clearSessions($faculty_number) {
  $query = "DELETE from sessions where sessionID=$faculty_number";
  insertUpdateQuery($query);
}

function testInput($input) {
  $input = trim($input);
  $input = htmlspecialchars($input);
  $input = stripslashes($input);

  return $input;
}

?>