checkLoggedIn();
getAllTopics();

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

document.getElementById("topics_button").addEventListener('click', e => {
  var filename;
  fetch('http://localhost/Test-Generator/api/admin/export.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "data": "topics" })
  }).then(async res => ({
    filename: fnGetFileNameFromContentDispostionHeader(res.headers.get('content-disposition')),
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

document.getElementById("question_history_button").addEventListener('click', e => {
  var filename;
  fetch('http://localhost/Test-Generator/api/admin/export.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "data": "question_history" })
  }).then(async res => ({
    filename: fnGetFileNameFromContentDispostionHeader(res.headers.get('content-disposition')),
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

document.getElementById("user_question_history_button").addEventListener('click', e => {
  faculty_number = document.getElementById("user_question_history").value;
  console.log("FACULTY NUMBER", faculty_number)

  var filename;
  fetch('http://localhost/Test-Generator/api/admin/export.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "data": "user_question_history", "faculty_number": faculty_number })
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


document.getElementById("topic_questions_button").addEventListener('click', e => {
  topicSelectEl = document.getElementById('topic-select')
  topicNumber = topicSelectEl.value;
  topicIndex = topicSelectEl.selectedIndex;
  topicName = topicSelectEl.options[topicIndex].text;

  console.log(topicNumber)

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

document.getElementById("users_button").addEventListener('click', e => {
  fetch('http://localhost/Test-Generator/api/admin/export.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "data": "users"})
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