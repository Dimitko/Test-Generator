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

const submitQuestion = e => {
  e.preventDefault();
  question_data = {
  "fn": document.getElementById('fn').value,
  "question_nr": 1,
  "topic_id": document.getElementById('topic_id').value,
  "aim": document.getElementById('aim').value,
  "question_text": document.getElementById('question_text').value,
  "option_1": document.getElementById('option_1').value,
  "option_2": document.getElementById('option_2').value,
  "option_3": document.getElementById('option_3').value,
  "option_4": document.getElementById('option_4').value,
  "answer": document.getElementById('answer').value,
  "difficulty": document.getElementById('difficulty').value,
  "feedback_correct": document.getElementById('feedback_correct').value,
  "feedback_incorrect": document.getElementById('feedback_incorrect').value,
  "notes": document.getElementById('notes').value,
  "type": document.getElementById('type').value
  }

  fetch('http://localhost/Test-Generator/api/question/submit.php', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(question_data)
  }).then(
  response => response.json()
  ).then(
    response => parseResponse(response)
  )
}

const importQuestion = e => {
  e.preventDefault();

  document.getElementById("response-container").innerHTML =""

  var fileUpload = document.getElementById("file-upload");
  if (fileUpload.files[0] == undefined) {
    // The user is clicking the button but has not selected anything.
    return
  }

  questions = "Hello";
  config = {
    complete: function (result, file) {
      questions = result['data'];

      allPromises = [];

      for (let i = 1; i < questions.length; i++) {
        allPromises.push(sendQuestion(questionToJSON(questions[i])));
      }

      Promise.all(allPromises).then(
        response => response.every(e => e)
      ).then(
        allWereSuccessful => {
          if (allWereSuccessful) {
            succes_element = document.createElement("text");
            succes_element.innerText = `Успешно импортирахте всички въпроси!`
            succes_element.style.color = "green";

            document.getElementById("response-container").appendChild(succes_element)
          }
        }
      )
    }
  }

  Papa.parse(fileUpload.files[0], config);
}

function questionToJSON(question) {
  import_question = {};
  import_question.timestamp = question[1];
  import_question.fn = question[2];
  import_question.topic_id = question[3];
  import_question.question_nr = question[4];
  import_question.aim = question[5];
  import_question.question_text = question[6];
  import_question.option_1 = question[7];
  import_question.option_2 = question[8];
  import_question.option_3 = question[9];
  import_question.option_4 = question[10];
  import_question.answer = question[11];
  import_question.difficulty = question[12];
  import_question.feedback_correct = question[13];
  import_question.feedback_incorrect = question[14];
  import_question.notes = question[15];
  import_question.type = question[16];
  return import_question;
}

function sendQuestion(question) {
  return fetch('http://localhost/Test-Generator/api/question/submit.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(question)
    }).then(
      response => response.json()
    ).then(
      response => {
        if (response["success"] == "false") {
          error_element = document.createElement("text");
          error_element.innerText = `Възникна грешка при импортиране на въпрос с номер ${question["question_nr"]}`
          error_element.style.color = "red";

          document.getElementById("response-container").appendChild(error_element)
          document.getElementById("response-container").appendChild(document.createElement("br"))
          return false;
        }

        return true;
      }
  )
}

function parseResponse(response) {

success = response["success"];
color = "red";
  if (success) {
    cleanQuestionSubmitForm();
    color = "green";
  }
questionSubmitResponse = document.getElementById("question-submit-response");
questionSubmitResponse.innerHTML = '<h1>' + response["message"] + '</h1>'
questionSubmitResponse.style = "font-size:50px;color:" + color

window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

function cleanQuestionSubmitForm() {
  document.getElementById('fn').value = "";
  // document.getElementById('question_nr').value = "";
  document.getElementById('aim').value = "";
  document.getElementById('question_text').value = "";
  document.getElementById('option_1').value = "";
  document.getElementById('option_2').value = "";
  document.getElementById('option_3').value = "";
  document.getElementById('option_4').value = "";
  document.getElementById('answer').value = "";
  document.getElementById('difficulty').value = "";
  document.getElementById('feedback_correct').value = "";
  document.getElementById('feedback_incorrect').value = "";
  document.getElementById('notes').value = "";
  document.getElementById('type').value = "";
}


(function () {
  getAllTopics();
  document.getElementById('difficulty-number').innerText = 5;
  document.getElementById('difficulty-number').style.fontSize = "4em";
  document.getElementById('difficulty-number').style.color = "blue"

  document.getElementById('question-submit').addEventListener('click', submitQuestion);
  document.getElementById('question-import').addEventListener('click', importQuestion);
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
    document.getElementById('difficulty-number').style.color = color

  });
})();

// (function () {
//   document.getElementById('question-import').addEventListener('click', importQuestion);
// })();

// (function() {
//   document.getElementById('fn').value = "81319";
//   document.getElementById('topic_id').value = "1000";
//   document.getElementById('aim').value = "Aim aim";
//   document.getElementById('question_text').value = "Question question question question";
//   document.getElementById('option_1').value = "Option 1, option 1";
//   document.getElementById('option_2').value = "Option 2, option 2";
//   document.getElementById('option_3').value = "Option 3, option 3";
//   document.getElementById('option_4').value = "Option 4, option 4";
//   document.getElementById('answer').value = "Answer answer";
//   document.getElementById('difficulty').value = "8";
//   document.getElementById('feedback_correct').value = "Bravo";
//   document.getElementById('feedback_incorrect').value = "Losho";
//   document.getElementById('notes').value = "Note note note note";
//   document.getElementById('type').value = "1";
// })();
