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
    );
}

function parseResponse(response) {
    success = response["success"];
    if (success) {
      cleanQuestionSubmitForm();
    }
    document.getElementById("question-submit-response").innerHTML = response["message"];
  }
  
  function cleanQuestionSubmitForm() {
    document.getElementById('fn').value = "";
    document.getElementById('question_nr').value = "";
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
  })();