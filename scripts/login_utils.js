var user_faculty_number;

function checkLoggedIn() {
  fetch('http://localhost/Test-Generator/api/users/logged_in.php', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(
    response => response.json()
  ).then(
    response => {
      if (response["logged_in"]) {
        user_faculty_number = response["faculty_number"];
        updateNavBarLoggedIn()
      } else {
        window.location.replace("http://localhost/Test-Generator/pages/LoginForm.html")
      }
    }
  )
}

function logout() {
  fetch('http://localhost/Test-Generator/api/users/logout.php', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(
    response => response.json()
  ).then(
    response => redirectToLogin()
  )
}

function updateNavBarLoggedIn() {
  navbar_login = document.getElementById("navbar-login");
  navbar_login.innerText = "Изход"
  navbar_login.addEventListener('click', logout)
}

function redirectToLogin() {
  window.location.replace("http://localhost/Test-Generator/pages/LoginForm.html");
}
