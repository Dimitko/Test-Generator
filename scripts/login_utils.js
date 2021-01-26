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

function getTopicOwner(topicNumber) {
  fetch('http://localhost/Test-Generator/api/users/topic_owner.php', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"topicNumber": topicNumber})
  }).then(
    response => response.json()
  ).then(
    response => {
      return response["owner_faculty_number"]
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

  if (user_faculty_number == 0) {
    updateNavBarAdminPanel();
  }

}

function updateNavBarAdminPanel() {
  navbar_conditions = document.getElementById("conditions-link");
  admin_panel_link = document.createElement("a");
  admin_panel_link.href = "http://localhost/Test-Generator/pages/AdminPanel.html";
  admin_panel_link.innerText = 'Администраторски панел';
  navbar_conditions.parentNode.insertBefore(admin_panel_link, navbar_conditions.nextSibling);
}

function redirectToLogin() {
  window.location.replace("http://localhost/Test-Generator/pages/LoginForm.html");
}
