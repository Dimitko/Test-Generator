checkLoginPageLoggedIn();

const loginFunction = e => {
  e.preventDefault();

  faculty_number = document.getElementById("faculty-number").value;
  user_key = document.getElementById('user-key').value;

  var all_correct = true;

  if (faculty_number.length == 0) {
    all_correct = false;
    color = "red";
    message = "Факултетен номер е задължително поле!";
    loginResponse = document.getElementById("login-response");
    loginResponse.innerHTML = message;
    loginResponse.style = "font-size:10px;color:" + color

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  if (user_key.length == 0) {
    all_correct = false;
    color = "red";
    message = "Потребителски ключ е задължителен!";
    loginResponse = document.getElementById("login-response");
    loginResponse.innerHTML += '<br />' + message;
    loginResponse.style = "font-size:10px;color:" + color

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

  if (all_correct) {
    fetch('http://localhost/Test-Generator/api/users/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"faculty_number": faculty_number, "user_key": user_key})
    }).then(
      response => response.json()
    ).then(
      response => {
        successfulLogin(response)
      }
    );
  }
}

function checkLoginPageLoggedIn() {
  fetch('http://localhost/Test-Generator/api/users/logged_in.php', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(
    response => response.json()
  ).then(
    response => updateLoginPageAlreadyLoggedIn(response)
  )
}


function updateLoginPageAlreadyLoggedIn(response) {
  is_logged_in = response["logged_in"];
  if (is_logged_in) {
    document.getElementById('login-form').hidden = true;
    document.getElementById('already-logged-in').innerText = document.getElementById('already-logged-in').innerText + response["faculty_number"]
    document.getElementById('already-logged-in').hidden = false;
    updateNavBarLoggedIn()
  }
}

function successfulLogin(response) {
  if (response.success == "false") {
    error_login = document.getElementById('error-login').innerText = response.msg;
  } else {
    console.log('User_key true?: ');
    console.log(response['res']);
    user_faculty_number = response["faculty_number"];
    updateNavBarLoggedIn()
    document.getElementById('login-form').hidden = true;
    document.getElementById('successfully-logged-in').innerText = document.getElementById('successfully-logged-in').innerText + response["faculty_number"];
    document.getElementById('successfully-logged-in').hidden = false;
    document.getElementById('user-data').innerText = 'Фак. номер ' + user_faculty_number + '  Тема ' + response["topicNumber"];  
  }
  clearLoginForm();
}

function clearLoginForm() {
  faculty_number = document.getElementById("faculty-number").value = "";
  document.getElementById("user-key").value = "";
  }  

(function () {
  document.getElementById('login-button').addEventListener('click', loginFunction);
})();