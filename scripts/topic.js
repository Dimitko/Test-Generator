checkLoggedIn();

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

const importTopic = e => {
  e.preventDefault();

  document.getElementById("response-container").innerHTML =""

  var fileUpload = document.getElementById("file-upload");
  if (fileUpload.files[0] == undefined) {
    // The user is clicking the button but has not selected anything.
    return
  }

  topics = "Hello";
  config = {
    complete: function (result, file) {
      topics = result['data'];

      allPromises = [];

      for (let i = 1; i < topics.length; i++) {
        allPromises.push(sendTopic(topicToJSON(topics[i])));
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

function topicToJSON(topic) {
  import_topic = {};
  import_topic.title = topic[1];
  import_topic.topicNumber = topic[2];
  import_topic.extraInfo = topic[3];
  return import_topic;
}

function sendTopic(topic) {
  return fetch('http://localhost/Test-Generator/api/topic/insert.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(topic)
    }).then(
      response => response.json()
    ).then(
      response => {
        if (response["success"] == "false") {
          error_element = document.createElement("text");
          error_element.innerText = `Възникна грешка при импортиране на тема с номер ${topic["topicNumber"]}`
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
  document.getElementById('topic-import').addEventListener('click', importTopic);
})();

// (function() {
//   document.getElementById('title').value = "Title-1"
//   document.getElementById('topicNumber').value = "1000"
//   document.getElementById('extraInfo').value = "Extra info for Title-1"
// })();
