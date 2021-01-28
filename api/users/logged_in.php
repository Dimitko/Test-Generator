<?php
    require("../../src/utils.php");
    session_start();
    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    $is_logged_in = checkLoggedIn();
    handleIsLoggedIn($is_logged_in);

    function handleIsLoggedIn($is_logged_in) {
        $result = ["success" => "true","logged_in" => $is_logged_in["logged_in"]];
        if ($is_logged_in["logged_in"]) {
            $faculty_number = $is_logged_in["faculty_number"];
            $result["faculty_number"] = $faculty_number;

            $query = "select topic.topicNumber from topic INNER join users on topic.topicID=users.topicID where users.facultyNr=$faculty_number";

            $query_results = executeDBQuery($query)[0]["topicNumber"];
            $result["topicNumber"] = $query_results;
        }
        echo(json_encode($result));
    }
?>