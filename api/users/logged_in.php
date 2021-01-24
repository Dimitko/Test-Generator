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
            $result["faculty_number"] = $is_logged_in["faculty_number"];
        }
        echo(json_encode($result));
    }
?>