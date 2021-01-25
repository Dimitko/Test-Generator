<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    handleExportQuestionStatistics();

    function handleExportQuestionStatistics(){
        echo("Not finished yet!");
    }