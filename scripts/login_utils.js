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
  const navbar_logout_HTML = `<i class="fa fa-sign-out " aria-hidden="true"></i> Изход`;
  navbar_login.innerHTML = navbar_logout_HTML; 
  // navbar_login.innerText = "Изход"
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
  students_panel_link = document.createElement("div");
  students_panel_link.className = "dropdown";
  students_panel_link.id = "students-panel";
  navbar_conditions.parentNode.insertBefore(students_panel_link, navbar_conditions.nextSibling);
  const panel_HTML = `<button class="dropbtn"><i class="fa fa-paw" aria-hidden="true"></i> Потребителски панел
                      <i class="fa fa-caret-down"></i>
                      </button>
                      <div class="dropdown-content">
                      <a href="http://localhost/Test-Generator/pages/Student_Questions_Panel.html"><i class="fa fa-folder-open" aria-hidden="true"></i> Моите добавени въпроси</a>
                      <a href="http://localhost/Test-Generator/pages/Student_Tests_Panel.html"><i class="fa fa-file-text" aria-hidden="true"></i> Моите направени тестове</a>
                      </div>`;
  students_panel_link.innerHTML = panel_HTML; 
}

function updateNavBarAdminPanel() {
  navbar_conditions = document.getElementById("conditions-link");
  admin_panel_link = document.createElement("a");
  admin_panel_link.href = "http://localhost/Test-Generator/pages/AdminPanel.html";
  navbar_conditions.parentNode.insertBefore(admin_panel_link, navbar_conditions.nextSibling);
  const panel_HTML = `<i class="fa fa-beer " aria-hidden="true"></i> Администраторски панел`;
  admin_panel_link.innerHTML = panel_HTML; 
}

function redirectToLogin() {
  window.location.replace("http://localhost/Test-Generator/pages/LoginForm.html");
}
