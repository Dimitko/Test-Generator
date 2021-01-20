function a() {
  console.log("works");
}

const submitTopic = e => {
  e.preventDefault();
  topic_data = {
    "title": document.getElementById('title').value,
    "topicNumber": document.getElementById('topicNumber').value,
    "extraInfo": document.getElementById('extraInfo').value,
  }

  fetch('http://localhost/Test-Generator/api/topic/insert.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(topic_data)
  }).then(
    response => response.json()
  ).then(
    response => parseResponse(response)
  );
}

function parseResponse(response) {
  success = response["success"];
  if (success) {
    cleanTopicSubmitForm();
  }
  document.getElementById("topic-submit-response").innerHTML = response["message"];
}

function cleanTopicSubmitForm() {
  document.getElementById('title').value = "";
  document.getElementById('topicNumber').value = "";
  document.getElementById('extraInfo').value = "";
}


(function () {
  document.getElementById('topic-submit').addEventListener('click', submitTopic);
})();

// (function() {
//   document.getElementById('title').value = "Title-1"
//   document.getElementById('topicNumber').value = "1000"
//   document.getElementById('extraInfo').value = "Extra info for Title-1"
// })();
