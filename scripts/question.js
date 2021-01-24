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
              var table = document.createElement("table");
              var rows = e.target.result.split("\n");
              for (var i = 0; i < rows.length; i++) {
                  var cells = rows[i].split(",");
                  if (cells.length > 1) {
                      var row = table.insertRow(-1);
                      for (var j = 0; j < cells.length; j++) {
                          var cell = row.insertCell(-1);
                          cell.innerHTML = cells[j];
                      }
                  }
              }
              var dvCSV = document.getElementById("dvCSV");
              dvCSV.innerHTML = "";
              dvCSV.appendChild(table);
          }
          reader.readAsText(fileUpload.files[0]);
      } else {
          alert("This browser does not support HTML5.");
      }
  } else {
      alert("Please upload a valid CSV file.");
  }

  console.log('Hello!');
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
