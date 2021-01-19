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

const startTest = e => {
    e.preventDefault();
    topicSelectEl = document.getElementById('topic-select')
    topicNumber = topicSelectEl.value;
    topicIndex = topicSelectEl.selectedIndex;
    topicName = topicSelectEl.options[topicIndex].text;

    generateTestForTopic(topicNumber, topicName);
}

const submitTest = e => {
    e.preventDefault();
    console.log("До тук работим");
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

function generateTestForTopic(topicNumber, topicName) {
    fetch('http://localhost/Test-Generator/api/test/generate.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"topicNumber": topicNumber})
    }).then(
        response => response.json()
    ).then(
        response => {
            buildTestHTML(response, topicName);
        }
    );
}


function buildTestHTML(test, topicName) {
    document.getElementsByClassName("form-style-2-heading")[0].innerText = "Тема " + topicName;
    document.getElementById("topic-select-form").remove()
    form = document.createElement('form')
    form.id = "topic-submit-form"

    for (let i = 0; i < test.length; i++) {
        if (i > 0) {
            form.appendChild(document.createElement('BR'));
            form.appendChild(document.createElement('HR'));
        }

        form.appendChild(buildQuestion(i, test[i]));
    }

    submit_button = document.createElement('input');
    submit_button.id = "test-submit";
    submit_button.type = "submit";
    submit_button.value = "Предай теста";
    submit_button.addEventListener('click', submitTest);

    form.appendChild(submit_button);


    document.getElementsByClassName("form-style-2")[0].appendChild(form);
}

function buildQuestion(idx, question) {
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
        question_container.appendChild(document.createElement("BR"));
    }

    return question_container;
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

(function () {
    document.getElementById('topic-submit').addEventListener('click', startTest);
  })();