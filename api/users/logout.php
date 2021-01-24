<?php
    require("../../src/utils.php");
    session_start();
    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    $is_logged_in = checkLoggedIn();
    handleUserLogout($is_logged_in);

    function handleUserLogout($is_logged_in) {
        if ($is_logged_in["logged_in"]) {
            $faculty_number = $is_logged_in["faculty_number"];
            clearSessions($faculty_number);
            unset($_SESSION['faculty_number']);
            session_destroy();
            setcookie("faculty_number", "", time() - 60, "/");


            echo json_encode(["success" => "true", "msg" => "Successfully logged out!", "faculty_number" => $is_logged_in["faculty_number"]]);
        } else {
            echo json_encode(["success" => "false", "msg" => "Not logged in!"]);
        }
    }

?>