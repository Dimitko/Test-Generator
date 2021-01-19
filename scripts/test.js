function getAllTopics() {
    fetch('http://localhost/Test-Generator/api/topic/select.php/all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        response => response.json()
    ).then(
        response => listTopics(response)
    );
}


function listTopics(response){
    response.forEach(topic => {
        let options = document.createElement('option');
        options.text = topic['topicNumber'] + ' - ' + topic['title'];
        options.value = topic['topicNumber'];
        document.getElementById("topic-select").appendChild(options);
    })
}

getAllTopics();