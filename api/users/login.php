<?php
    require("../../src/utils.php");
    session_start();
    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    $is_logged_in = checkLoggedIn();
    handleLogin($is_logged_in);

    return 5;

    function handleLogin($is_logged_in) {
        if ($is_logged_in["logged_in"]) {
          $_SESSION["faculty_number"] = $is_logged_in["faculty_number"];

          echo json_encode(["success" => "true", "msg" => "Already logged in!", "faculty_number" => $is_logged_in["faculty_number"]]);
        } else {
          $request = parseRequest();

          $response = login($request);

          echo json_encode($response);
        }
    }

    function login($request) {
      $faculty_number = $request["faculty_number"];
      $user_key = $request["user_key"];
      $topicID = 0;
      $topicNumber = $topicID;

      $sql = "SELECT user_key FROM users WHERE facultyNr=$faculty_number";
      $result = executeDBQuery($sql);

      $u_key = $result[0]["user_key"];

      if (!($user_key == $u_key)) {
        return ["success" => "false", "msg" => "Грешен потребителски ключ!"];
      }

      $sql = "SELECT topicID FROM users WHERE facultyNr=$faculty_number";
      $topicID = executeDBQuery($sql)[0]["topicID"];

      $sql = "SELECT topicNumber FROM topic WHERE topicID=$topicID";
      $topicNumber = executeDBQuery($sql)[0]["topicNumber"];
      $res = executeDBQuery($sql)[0]["topicNumber"];

      // Clear old sessions that have expired but are still in the DB.
      clearSessions($faculty_number);

      $expires = time() + 60 * 20;
      $timestamp = date("Y-m-d H:i:s", $expires);

      $query = "INSERT INTO sessions(sessionID, facultyNr, expires) VALUES ('$faculty_number', '$faculty_number', '$timestamp')";
      insertUpdateQuery($query);


      setcookie("faculty_number", $faculty_number, $expires, "/");
      $_SESSION["faculty_number"] = $faculty_number;

      // return ["success" => "true", "msg" => "Successfully logged in!", "faculty_number" => $faculty_number, "topicNumber" => $topicNumber];
      return ["success" => "true", "msg" => "Successfully logged in!", "faculty_number" => $faculty_number, "topicNumber" => $topicNumber, "res" => $res];
    }
?>
