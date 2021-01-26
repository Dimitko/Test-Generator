<?php
    require("../../src/utils.php");

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    handleExportQuestionStatistics();

    function handleExportQuestionStatistics(){
        $request = parseRequest();
        exportData($request);
    }


    function exportData($request) {
        switch ($request["data"]) {
            case "user_question_history":
                exportUserQuestionHistory($request);
            case "user_test_history":
                echo "UNFINISHED";
                break;
            case "users":
                exportAllUsers();
                break;
            case "question_history":
                exportQuestionHistory();
                break;
            case "all_users_test_history":
                echo "UNFINISHED";
                break;
            case "topics":
                exportTopics();
                break;
            case "topic_questions":
                exportTopicQuestions($request);
                break;
        }
    }

    function array_to_csv_download($array, $filename = "export.csv", $delimiter=",") {
        header('Content-Type: application/csv');
        header('Content-Disposition: attachment; filename="'.$filename.'";');

        // open the "output" stream
        // see http://www.php.net/manual/en/wrappers.php.php#refsect2-wrappers.php-unknown-unknown-unknown-descriptioq
        $f = fopen('php://output', 'w');

        foreach ($array as $line) {
            fputcsv($f, $line, $delimiter);
        }
    }

    function exportUserQuestionHistory($request) {
        $user_faculty_number = $request["faculty_number"];

        $user_question_history = executeDBQuery("select * from question_history where userID=$user_faculty_number");

        array_to_csv_download($user_question_history, $user_faculty_number. "_question_history.csv");
    }

    function exportQuestionHistory() {
        $question_history = executeDBQuery("select * from question_history");

        array_to_csv_download($question_history, "question_history.csv");
    }

    function exportTopics() {
        $topics = executeDBQuery("select * from topic");

        array_to_csv_download($topics, "topics.csv");
    }

    function exportTopicQuestions($request) {
        $topicNumber = $request["topicNumber"];
        $topicID = executeDBQuery("select topicID from topic where topicNumber=$topicNumber")[0]["topicID"];
        $questions = executeDBQuery("select * from question where topic_id=$topicID");

        array_to_csv_download($questions, "topic-". $topicNumber . "-questions.csv");
    }

    function exportAllUsers() {
        $users = executeDBQuery("select * from users");

        array_to_csv_download($users, "users.csv");
    }
?>