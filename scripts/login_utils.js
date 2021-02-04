user_faculty_number = null;
user_topic_number = 0;

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
        user_topic_number = response["topicNumber"];
        updateNavBarLoggedIn(user_faculty_number, user_topic_number)
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

function updateNavBarLoggedIn(user_faculty_number, user_topic_number) {
  navbar_login = document.getElementById("navbar-login");
  navbar_login.innerText = "Изход"
  navbar_login.addEventListener('click', logout)

  document.getElementById("register-menu").hidden = true;

  if (user_faculty_number == 0) {
    updateNavBarAdminPanel();
  } else {
    updateNavBarStudentsPanel();
  }


  document.getElementById('user-data').innerText = 'Фак. номер: ' + user_faculty_number + '  Тема: ' + user_topic_number;

}

function updateNavBarStudentsPanel() {
  navbar_conditions = document.getElementById("conditions-link");
  students_panel_link = document.createElement("a");
  students_panel_link.href = "http://localhost/Test-Generator/pages/Students_Panel.html";
  navbar_conditions.parentNode.insertBefore(students_panel_link, navbar_conditions.nextSibling);
  const panel_HTML = `<i class="fa fa-paw" aria-hidden="true"></i> Потребителски панел`;
  navbar_conditions.innerHTML = panel_HTML; 
}

function updateNavBarAdminPanel() {
  navbar_conditions = document.getElementById("conditions-link");
  admin_panel_link = document.createElement("a");
  admin_panel_link.href = "http://localhost/Test-Generator/pages/AdminPanel.html";
  navbar_conditions.parentNode.insertBefore(admin_panel_link, navbar_conditions.nextSibling);
  const panel_HTML = `<i class="fa fa-beer " aria-hidden="true"></i> Администраторски панел`;
  navbar_conditions.innerHTML = panel_HTML; 
}

function redirectToLogin() {
  window.location.replace("http://localhost/Test-Generator/pages/LoginForm.html");
}
