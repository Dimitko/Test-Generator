function getAllUsers(user) {
    fetch('http://localhost/Test-Generator/api/users/select.php/all', {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        response => response.json()
    ).then(
        response => checkUserExists(response, user)
    );
}

const registerFunction = e => {
    e.preventDefault();
    var topic_number = '0';
    var role = 'student';
    var all_correct = true;

    faculty_number = document.getElementById("faculty-number").value;
    if (faculty_number.length > 0 && faculty_number.length <= 2) {
        topic_number = '0';
        role = 'admin';
    } else if(faculty_number.length > 2) {
        topic_number = document.getElementById("topic-number").value;
    }
    user_key = document.getElementById("user-key").value;

    if (faculty_number.length == 0) {
        all_correct = false;
        color = "red";
        message = "Факултетен номер е задължително поле!";
        registerSubmitResponse = document.getElementById("register-submit-response");
        registerSubmitResponse.innerHTML = message;
        registerSubmitResponse.style = "font-size:10px;color:" + color

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    } else {
        if (topic_number != 0) {
            var fn = /^\d{5}$/;
            if (!faculty_number.match(fn)) {
                all_correct = false;
                color = "red";
                message = "Факултетен номер е с пет цифри!";
                registerSubmitResponse = document.getElementById("register-submit-response");
                registerSubmitResponse.innerHTML += '<br />' + message;
                registerSubmitResponse.style = "font-size:10px;color:" + color
        
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            }
        }
    }

    if (faculty_number.length > 2) {
        if (topic_number.length != 0) {
            var topic_num = /^\d{1,4}$/;
            if (!topic_number.match(topic_num)) {
                all_correct = false;
                color = "red";
                message = "Номерът на тема може да бъде с от 1 до 4 цифри!";
                registerSubmitResponse = document.getElementById("register-submit-response");
                registerSubmitResponse.innerHTML += '<br />' + message;
                registerSubmitResponse.style = "font-size:10px;color:" + color
        
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            }
        } else {
            all_correct = false;
            color = "red";
            message = "Номерът на тема е задължителен!";
            registerSubmitResponse = document.getElementById("register-submit-response");
            registerSubmitResponse.innerHTML += '<br />' + message;
            registerSubmitResponse.style = "font-size:10px;color:" + color
    
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }
    }

    if (user_key.length != 0) {
        var u_key = /^\d{4}$/;
        if (!user_key.match(u_key)) {
            all_correct = false;
            color = "red";
            message = "Потребителски ключ е с 4 цифри!";
            registerSubmitResponse = document.getElementById("register-submit-response");
            registerSubmitResponse.innerHTML += '<br />' + message;
            registerSubmitResponse.style = "font-size:10px;color:" + color
    
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }
    } else {
        all_correct = false;
        color = "red";
        message = "Потребителски ключ е задължителен!";
        registerSubmitResponse = document.getElementById("register-submit-response");
        registerSubmitResponse.innerHTML += '<br />' + message;
        registerSubmitResponse.style = "font-size:10px;color:" + color

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }

    if (all_correct) {
        const user = {
            "faculty_number": faculty_number,
            "topic_number": topic_number,
            "user_key": user_key,
            "role": role
        }
    
        console.log(user);
    
        getAllUsers(user);
    }
    
    clearRegisterUserForm();
  }

function checkUserExists(users, user) {
    for (var i = 0; i < users.length; i++) {
        if (users[i]["facultyNr"] == user.faculty_number) {
            color = "red";
            message = "Потребител с този факултетен номер вече съществува!";
            registerSubmitResponse = document.getElementById("register-submit-response");
            registerSubmitResponse.innerHTML += '<br />' + message;
            registerSubmitResponse.style = "font-size:10px;color:" + color
    
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            return;
        }
    }
    fetch('http://localhost/Test-Generator/api/users/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        }).then(
        response => response.json()
        ).then(
          response => handleResponse(response)
        ) 
}

function handleResponse(response) {
    var color = "blue";
    if (response.success) {
        color = "green";
    } else {
        color = "red";
    }
    message = response.message;
    registerSubmitResponse = document.getElementById("register-submit-response");
    registerSubmitResponse.innerHTML += '<br />' + message;
    registerSubmitResponse.style = "font-size:10px;color:" + color
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

function clearRegisterUserForm() {
faculty_number = document.getElementById("faculty-number").value;
if (faculty_number.length > 2) {
    topic_number= document.getElementById("topic-number").value = "";
} 
document.getElementById("faculty-number").value = "";
document.getElementById("user-key").value = "";
}  

(function () {
    document.getElementById('register-button').addEventListener('click', registerFunction);
  })();