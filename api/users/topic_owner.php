<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    handleTopicOwner();

    function handleTopicOwner(){
        $request = parseRequest();

        $response = owner($request);

        echo json_encode($response);
    }

    function owner($request){
        $topicNumber = $request["topicNumber"];
        $topicID = executeDBQuery("SELECT topicID FROM topic WHERE topicNumber=$topicNumber")[0]["topicID"];
        $owner = executeDBQuery("SELECT facultyNr FROM users WHERE topicID=$topicID")[0]["facultyNr"];

        return [
            "owner_faculty_number" => $owner
        ];
    }