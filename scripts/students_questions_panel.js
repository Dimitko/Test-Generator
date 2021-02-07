checkLoggedIn();
getStudentInfo();

let fnGetFileNameFromContentDispostionHeader = function (header) {
  let contentDispostion = header.split(';');
  const fileNameToken = `filename=`;

  let fileName = 'downloaded.pdf';
  for (let thisValue of contentDispostion) {
      if (thisValue.trim().indexOf(fileNameToken) === 0) {
          fileName = decodeURIComponent(thisValue.trim().replace(fileNameToken, ''));
          break;
      }
  }
  return fileName.replace(/\"/g, '');
};

document.getElementById("topic_questions_button").addEventListener('click', e => {
  topicSelectEl = document.getElementById('topic-select')
  topicNumber = topicSelectEl.value;
  topicIndex = topicSelectEl.selectedIndex;
  topicName = topicSelectEl.options[topicIndex].text;

  fetch('http://localhost/Test-Generator/api/admin/export.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "data": "topic_questions", "topicNumber": topicNumber })
  }).then(async res => ({
    filename: fnGetFileNameFromContentDispostionHeader(res.headers.get('Content-Disposition')),
    blob: await res.blob()
  })).then(
    result => {
      filename = result.filename;
      blob = result.blob;

      var objURL = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = objURL;
      link.download = filename;
      link.click();
    }
  )
});

function getStudentInfo() {
    fetch('http://localhost/Test-Generator/api/users/logged_in.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(
      response => response.json()
    ).then(
      response => {
        if (response["logged_in"]) {
          user_faculty_number = response["faculty_number"];
          user_topic_number = response["topicNumber"];
          getStudentTopic(user_topic_number)
        } else {
          window.location.replace("http://localhost/Test-Generator/pages/LoginForm.html")
        }
      }
    )
  }

  const getStudentData = e => {
    e.preventDefault();
    fetch('http://localhost/Test-Generator/api/users/logged_in.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(
      response => response.json()
    ).then(
      response => {
        if (response["logged_in"]) {
          user_faculty_number = response["faculty_number"];
          user_topic_number = response["topicNumber"];
          getQuestions(user_faculty_number)
        } else {
          window.location.replace("http://localhost/Test-Generator/pages/LoginForm.html")
        }
      }
    )
  }

function getQuestions(user_fn_number) {
    fetch('http://localhost/Test-Generator/api/question/select.php/byFn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"fn": user_fn_number})
  }).then(
    response => response.json()
  ).then(
    response => showQuestions(response)
  );
}

function showQuestions(response) {
  response.forEach(question => {
    let options = document.createElement('option');
    options.text = question['question_nr'] + ' - ' + question['question_text'];
    options.value = question['id'];
    options.id = "question-id";
    document.getElementById("question-select").appendChild(options);
})
}

function getStudentTopic(user_topic_number) {
    fetch('http://localhost/Test-Generator/api/topic/select.php/byNumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"topicNumber": user_topic_number})
        }).then(
        response => response.json()
        ).then(
          response => listTopics(response)
        )
  }

  const getQuestion = e => {
    e.preventDefault();

    question_id = document.getElementById("question-select").value;

    fetch('http://localhost/Test-Generator/api/question/select.php/byId', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({"id": question_id})
      }).then(
      response => response.json()
      ).then(
        response => showQuestion(response)
      )

    question_form_element = document.getElementById("question-remove-change");
    question_form_element.hidden = false;
  }

  function showQuestion(question) {
      // console.log(question[0]);
      document.getElementById('aim').value = question[0]['aim'];
      document.getElementById('question_text').value = question[0]['question_text'];
      document.getElementById('option_1').value = question[0]['option_1'];
      document.getElementById('option_2').value = question[0]['option_2'];
      document.getElementById('option_3').value = question[0]['option_3'];
      document.getElementById('option_4').value = question[0]['option_4'];
      document.getElementById('answer').value = question[0]['answer'];
      document.getElementById('difficulty').value = question[0]['difficulty'];
      document.getElementById('feedback_correct').value = question[0]['feedback_correct'];
      document.getElementById('feedback_incorrect').value = question[0]['feedback_incorrect'];
      document.getElementById('notes').value = question[0]['notes'];
      document.getElementById('type').value = question[0]['type'];
  }

  const removeQuestion = e => {
    e.preventDefault();

    question_id = document.getElementById("question-select").value;

    fetch('http://localhost/Test-Generator/api/question/delete.php/byId', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({"question_id": question_id})
      }).then(
      response => response.json()
      ).then(
        response => handleQuestionRemoveResponse(response)
      )  
  }

  function handleQuestionRemoveResponse(response) {
    color = "green";

    selected_question = document.getElementById("question-select");

    question_info = selected_question.options[selected_question.selectedIndex].text;

    message = "Успешно изтрихте въпрос " + question_info + " !";

    question_remove_response = document.getElementById("question-remove-change-response");

    if (!response) {
      message = "Възникна грешка!";
      color = "red";
    }
    question_remove_response.innerHTML = '<h2>' + message + '</h2>';
    question_remove_response.style = "font-size:15px;color:" + color;
  }

  const changeQuestion = e => {
    e.preventDefault();

    question_id = document.getElementById("question-select").value;

    aim = document.getElementById('aim').value;
    question_text = document.getElementById('question_text').value;
    option_1 = document.getElementById('option_1').value;
    option_2 = document.getElementById('option_2').value;
    option_3 = document.getElementById('option_3').value;
    option_4 = document.getElementById('option_4').value;
    answer = document.getElementById('answer').value;
    difficulty = document.getElementById('difficulty').value;
    feedback_correct = document.getElementById('feedback_correct').value;
    feedback_incorrect = document.getElementById('feedback_incorrect').value;
    notes = document.getElementById('notes').value;
    type = document.getElementById('type').value;

    const question_data = {
      question_id,
      aim,
      question_text,
      option_1,
      option_2,
      option_3,
      option_4,
      answer,
      difficulty,
      feedback_correct,
      feedback_incorrect,
      notes,
      type
    }

    fetch('http://localhost/Test-Generator/api/question/change.php/byId', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(question_data)
      }).then(
      response => response.json()
      ).then(
        response => handleQuestionChangeResponse(response)
      )  
  }

  function handleQuestionChangeResponse(response) {
    color = "green";

    selected_question = document.getElementById("question-select");

    question_info = selected_question.options[selected_question.selectedIndex].text;

    message = "Успешно променихте въпрос " + question_info + " !";

    question_change_response = document.getElementById("question-remove-change-response");

    if (!response.success) {
      message = "Възникна грешка!";
      color = "red";
    }
    question_change_response.innerHTML = '<h2>' + message + '</h2>';
    question_change_response.style = "font-size:15px;color:" + color;
  }

  function listTopics(response) {
    response.forEach(topic => {
        let options = document.createElement('option');
        options.text = topic['topicNumber'] + ' - ' + topic['title'];
        options.value = topic['topicNumber'];
        document.getElementById("topic-select").appendChild(options);
    })
  }

  (function () {
    question_form_element = document.getElementById("question-remove-change");
    question_form_element.hidden = true;

    document.getElementById('show-questions').addEventListener('click', getStudentData);

    document.getElementById('difficulty-number').innerText = 5;
    document.getElementById('difficulty-number').style.fontSize = "4em";
    document.getElementById('difficulty-number').style.color = "blue"
    document.getElementById('difficulty').addEventListener('input', e => {
      difficulty_value = document.getElementById('difficulty').value;
      color = "green";
      if (difficulty_value <= 3) {
        color = "green"
      } else if (difficulty_value < 6) {
        color = "blue"
      } else if (difficulty_value < 8) {
        color = "orange"
      } else {
        color = "red"
      }

    document.getElementById('difficulty-number').innerText = document.getElementById('difficulty').value;
    document.getElementById('difficulty-number').style.fontSize = "4em";
    document.getElementById('difficulty-number').style.color = color;
  });

  document.getElementById('show-question').addEventListener('click', getQuestion);

  document.getElementById('question-remove').addEventListener('click', removeQuestion);
  document.getElementById('question-change').addEventListener('click', changeQuestion);
  })();