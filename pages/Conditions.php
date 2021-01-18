<html>
    <head>
        <meta charset="utf-8"/>
        <title>Smile</title>
        <link href="../components/PageStyling.css" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href = "../public/smile.jpg" rel="icon" type="image/jpg">
        <body class="bclass">
            <div class="topnav">
                <a class="active" href="../"><i class="fa fa-fw fa-home"></i> Smile</a>
                <div class="dropdown">
                        <button class="dropbtn"><i class="fa fa-plus-square" aria-hidden="true"></i> Добавяне
                        <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                        <a href="TopicForm.html"><i class="fa fa-book" aria-hidden="true"></i> Добавяне на тема</a>
                        <a href="QuestionForm.html"><i class="fa fa-magic" aria-hidden="true"></i> Добавяне на въпроси</a>
                        </div>
                </div>
                <a href="#"><i class="fa fa-puzzle-piece" aria-hidden="true"></i> Започване на тест</a>
                <a href=""><i class="fa fa-handshake-o" aria-hidden="true"></i> Общи условия</a>
                <div class="topnav-right">
                <a href="LoginForm.html">Вход <i class="fa fa-sign-in" aria-hidden="true"></i></a>
                    <div class="dropdown">
                        <button class="dropbtn"><i class="fa fa-user-circle-o" aria-hidden="true"></i> Регистрация
                        <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                        <a href="RegisterStudentsForm.html"><i class="fa fa-user-plus" aria-hidden="true"></i> Студенти</a>
                        <a href="RegisterTeachersForm.html"><i class="fa fa-user-plus" aria-hidden="true"></i> Преподаватели</a>
                        </div>
                    </div>
                </div>
            </div> 
            <?php
                require_once "../components/Conditions.php";

                $conditions = createConditions();
                echo "<br />";
                echo "<br />";
                $i = 1;
                foreach($conditions as $condition) {
                    echo $i . '.' . ' ';
                    echo $condition;
                    echo "<br />";
                    echo "<br />";
                    $i++;
                }
            ?>
        </body>
    </head> 
</html>