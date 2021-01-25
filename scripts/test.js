checkLoggedIn();
function getAllTopics() {
    fetch('http://localhost/Test-Generator/api/topic/select.php/all', {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        response => response.json()
    ).then(
        response => listTopics(response)
    );
}

function listTopics(response) {
    response.forEach(topic => {
        let options = document.createElement('option');
        options.text = topic['topicNumber'] + ' - ' + topic['title'];
        options.value = topic['topicNumber'];
        document.getElementById("topic-select").appendChild(options);
    })
}

function listTypes() {
    let option1 = document.createElement('option');
    option1.text = 'За предварителни знания (pre-question)';
    let option2 = document.createElement('option');
    option2.text = 'По време на презентацията (poll question)';
    let option3 = document.createElement('option');
    option3.text = 'След презентацията (test your knowledge)';
    option1.value = 1;
    option2.value = 2;
    option3.value = 3;
    selectField = document.getElementById("test-type-select");
    selectField.appendChild(option1);
    selectField.appendChild(option2);
    selectField.appendChild(option3);
}

const startTest = e => {
    e.preventDefault();
    topicSelectEl = document.getElementById('topic-select')
    topicNumber = topicSelectEl.value;
    topicIndex = topicSelectEl.selectedIndex;
    topicName = topicSelectEl.options[topicIndex].text;

    testTypeSelectEl = document.getElementById('test-type-select');
    testType = testTypeSelectEl.value;

    generateTestForTopic(topicNumber, topicName, testType);
}

const submitTest = e => {
    e.preventDefault();
    request = buildSubmitRequest();
    fetch('http://localhost/Test-Generator/api/test/submit.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    }).then(
        response => response.json()
    ).then(
        response => gradeTest(response)
    );
}

function gradeTest(response) {
    correct_answers_number = 0;
    all_question_containers = document.getElementsByClassName("question_container");
    for (let i = 0; i < response.length; i++) {
        is_correct = response[i]["result"];
        if (is_correct) {
            correct_answers_number++;
        }
        question_container = all_question_containers[i];
        selected_answer = response[i]["answer"];

        feedback_text = response[i]["feedback"];
        feedback = document.createElement("p");
        feedback.innerText = feedback_text;

        question_container.appendChild(document.createElement("br"));
        question_container.appendChild(feedback);


        for (let j = 0; j < 4; j++) {
            id = ("q" + i) + ("a" + j);
            answer_radio_button = document.getElementById(id);
            answer = answer_radio_button.value;
            label = document.getElementById("label-" + id);

            if (!is_correct) {
                feedback.style = "color:red";
                correct_answer = response[i]["correct_answer"];
                if (label.innerText === correct_answer) {
                    label.style = "color:green";
                }

                if (answer === selected_answer) {
                    label.style = "color:red";
                }
            } else {
                feedback.style = "color:green";
                if (answer === selected_answer) {
                    label.style = "color:green";
                }
            }
        }
    }

    submit_button = document.getElementById('test-submit');
    submit_button.remove();


    grading_container = document.createElement("div");
    grading_score = document.createElement("h1");
    grading_score.innerText = "Резултат: " + correct_answers_number + "/" + response.length + " верни отговори";
    percentage = correct_answers_number / parseFloat(response.length);
    grading_color = "green";
    if (percentage < 0.8) {
        grading_color = "blue";
    }

    if (percentage < 0.6) {
        grading_color = "orange";
    }

    if (percentage < 0.3) {
        grading_color = "red";
    }

    grading_score.style = "font-size:50px;color:" + grading_color;
    grading_container.appendChild(grading_score);

    form = document.getElementById("topic-submit-form");
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("hr"));
    form.appendChild(grading_container);


}

function buildSubmitRequest() {
    request = [];

    all_question_containers = document.getElementsByClassName("question_container");

    for (let i = 0; i < all_question_containers.length; i++) {
        question_id = all_question_containers[i].firstChild.id;
        question_text = all_question_containers[i].firstChild.innerText;
        question_entry = {
            "id": question_id,
            "question_text": question_text,
        };

        for (let j = 0; j < 4; j++) {
            id = ("q" + i) + ("a" + j);
            answer_radio_button = document.getElementById(id);
            answer = answer_radio_button.value;

            label = document.getElementById("label-" + id);
            answer_text = label.innerText;
            question_entry[answer] = answer_text;

            if (answer_radio_button.checked) {
                question_entry["answer"] = answer;
            }
        }

        request.push(question_entry);
    }

    return request;
}

function generateTestForTopic(topicNumber, topicName, testType) {
    fetch('http://localhost/Test-Generator/api/users/topic_owner.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "topicNumber": topicNumber})
    }).then(
        response => response.json()
    ).then(
        response => {
            topic_owner = response["owner_faculty_number"];
            show_stats = false

            if (topic_owner == user_faculty_number || user_faculty_number == 0) {
                show_stats = true
            }

            fetch('http://localhost/Test-Generator/api/test/generate.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "topicNumber": topicNumber, "testType": testType })
            }).then(
                test_response => test_response.json()
            ).then(
                test => {
                    getStatsForQuestions(test, show_stats).then(
                        questions_statistics_array => {
                            questions_statistics = {}
                            questions_statistics_array.forEach(function (item, index) {
                                questions_statistics[item["question_id"]] = item
                            })
                            buildTestHTML(test, topicName, show_stats, questions_statistics);
                        }
                    )
                });
        }
    );
}

function getStatsForQuestions(test) {
    if (!show_stats) {
        return Promise.resolve([])
    }
    all_promises = []
    for (let i = 0; i < test.length; i++) {
        question_id = test[i]["id"]
        request_body = {"question_id": question_id}
        question_promise =  fetch('http://localhost/Test-Generator/api/history/statistics.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request_body)
        }).then(
            response => response.json()
        )

        all_promises.push(question_promise);
    }

    return Promise.all(all_promises)
}

function buildTestHTML(test, topicName, show_stats, question_statistics) {
    console.log("Building question")
    console.log("Test length", test.length)
    document.getElementsByClassName("form-style-2-heading")[0].innerText = "Тема " + topicName;
    document.getElementById("topic-select-form").remove()
    form = document.createElement('form')
    form.id = "topic-submit-form"

    for (let i = 0; i < test.length; i++) {
        console.log("Building question i")
        if (i > 0) {
            form.appendChild(document.createElement('BR'));
            form.appendChild(document.createElement('HR'));
        }

        console.log("Building question")
        if (show_stats) {
            question = test[i];
            question_id = question["id"];
            question_stats = question_statistics[question_id];
        } else {
            question_stats = null;
        }

        form.appendChild(buildQuestion(i, test[i], show_stats, question_stats));
    }

    submit_button = document.createElement('input');
    submit_button.id = "test-submit";
    submit_button.type = "submit";
    submit_button.value = "Предай теста";
    submit_button.addEventListener('click', submitTest);

    form.appendChild(submit_button);


    document.getElementsByClassName("form-style-2")[0].appendChild(form);
}

function buildQuestion(idx, question, show_stats, question_statistics) {
    question_container = document.createElement("div");
    question_container.id = "question-" + idx + "-container";
    question_container.classList.add("question_container");
    question_text = buildQuestionText(question);
    question_container.appendChild(question_text);

    for (let i = 0; i < 4; i++) {
        option = "option_" + (i + 1);
        option_text = question[option];

        radio_button = document.createElement("input");
        radio_button.type = "radio";
        radio_button.value = option;
        radio_button.name = "q" + idx;
        radio_button.id = ("q" + idx) + ("a" + i);

        label = document.createElement("label");
        label.id = "label-" + radio_button.id;
        label.htmlFor = radio_button.id;
        label.innerText = question[option];

        question_container.appendChild(radio_button);
        question_container.appendChild(label);

        console.log("Building question statistics");

        question_container.appendChild(document.createElement("BR"));
    }

    if (show_stats) {
        question_container.appendChild(buildQuestionStatistics(question_statistics));
        question_container.appendChild(document.createElement("BR"));
    }

    return question_container;
}

function buildQuestionStatistics(question_statistics) {
    console.log(question_statistics)
    stats_paragraph = document.createElement("p");
    times_answered = question_statistics["times_answered"];
    correct_times_answered = question_statistics["correct_times_answered"];
    option_1_answered = question_statistics["option_1"]
    option_2_answered = question_statistics["option_2"]
    option_3_answered = question_statistics["option_3"]
    option_4_answered = question_statistics["option_4"]
    stats_paragraph.innerText = `
        Times Answered: ${times_answered},
        TImes Answered Correctly: ${correct_times_answered},
        Answer Distribution: ${option_1_answered},${option_2_answered},${option_3_answered},${option_4_answered}
    `

    stats_paragraph.style.color = "gray";
    stats_paragraph.style.opacity = 0.8;

    return stats_paragraph;
}

function buildQuestionText(question) {
    question_paragraph = document.createElement('p');
    question_paragraph.id = question["id"];

    question_text = document.createElement("h2");
    question_text.innerText = question["question_text"];
    question_paragraph.appendChild(question_text);

    return question_paragraph;
}

// On load
getAllTopics();

listTypes();

(function () {
    document.getElementById('topic-submit').addEventListener('click', startTest);
  })();