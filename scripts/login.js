checkLoginPageLoggedIn();

const loginFunction = e => {
  e.preventDefault();

  faculty_number = document.getElementById("faculty-number").value;

  fetch('http://localhost/Test-Generator/api/users/login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"faculty_number": faculty_number})
  }).then(
    response => response.json()
  ).then(
    response => successfulLogin(response)
  );
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
  document.getElementById('login-form').hidden = true;
  document.getElementById('successfully-logged-in').innerText = document.getElementById('successfully-logged-in').innerText + response["faculty_number"]
  document.getElementById('successfully-logged-in').hidden = false;
  updateNavBarLoggedIn()
}

(function () {
  document.getElementById('login-button').addEventListener('click', loginFunction);
})();