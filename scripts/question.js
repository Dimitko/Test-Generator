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

  var fileUpload = document.getElementById("file-upload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
          var reader = new FileReader();
          reader.onload = function (e) {
              var rows = e.target.result.split("\n");
              import_questions = [];
              for (var i = 1; i < rows.length; i++) {
                  var cells = rows[i].split(",");
                  if (cells.length > 1 && i != 1) {
                      import_question = {};
                      import_question.timestamp = cells[1];
                      import_question.fn = cells[2];
                      import_question.topic_id = cells[3];
                      import_question.question_nr = cells[4];
                      import_question.aim = cells[5];
                      import_question.question_text = cells[6];
                      import_question.option_1 = cells[7];
                      import_question.option_2 = cells[8];
                      import_question.option_3 = cells[9];
                      import_question.option_4 = cells[10];
                      import_question.answer = cells[11];
                      import_question.difficulty = cells[12];
                      import_question.feedback_correct = cells[13];
                      import_question.feedback_incorrect = cells[14];
                      import_question.notes = cells[15];
                      import_question.type = cells[16];

                      import_questions.push(import_question);
                  }
              }
              console.log(import_questions);
          }
          reader.readAsText(fileUpload.files[0]);
      } else {
          alert("This browser does not support HTML5.");
      }
  } else {
      alert("Please upload a valid CSV file.");
  }
}

function parseResponse(response) {

success = response["success"];
console.log("success");
console.log(success);
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
  document.getElementById('question-submit').addEventListener('click', submitQuestion);
  document.getElementById('question-import').addEventListener('click', importQuestion);
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
