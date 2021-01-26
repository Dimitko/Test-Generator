const navHTML = `
    <div class="topnav">
      <a class="active" href="/Test-Generator/index.html"><i class="fa fa-fw fa-home"></i> Smile</a>
      <div class="dropdown">
          <button class="dropbtn"><i class="fa fa-plus-square" aria-hidden="true"></i> Добавяне
          <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
          <a href="/Test-Generator/pages/TopicForm.html"><i class="fa fa-book" aria-hidden="true"></i> Добавяне на тема</a>
          <a href="/Test-Generator/pages/QuestionForm.html"><i class="fa fa-magic" aria-hidden="true"></i> Добавяне на въпроси</a>
          </div>
      </div>
      <a href="/Test-Generator/pages/Test.html"><i class="fa fa-puzzle-piece" aria-hidden="true"></i> Започване на тест</a>
      <a id="conditions-link" href="/Test-Generator/pages/Conditions.html"><i class="fa fa-handshake-o" aria-hidden="true"></i> Общи условия</a>
      <div class="topnav-right">
          <a id="navbar-login" href="/Test-Generator/pages/LoginForm.html">Вход <i class="fa fa-sign-in" aria-hidden="true"></i></a>
          <div class="dropdown">
              <button class="dropbtn"><i class="fa fa-user-circle-o" aria-hidden="true"></i> Регистрация
              <i class="fa fa-caret-down"></i>
              </button>
              <div class="dropdown-content">
              <a href="/Test-Generator/pages/RegisterStudentsForm.html"><i class="fa fa-user-plus" aria-hidden="true"></i> Студенти</a>
              <a href="/Test-Generator/pages/RegisterTeachersForm.html"><i class="fa fa-user-plus" aria-hidden="true"></i> Преподаватели</a>
              </div>
          </div>
      </div>
    </div>
`;

function generateNavigationBar() {
  bodyHTML = document.getElementsByTagName('body')[0].innerHTML;
  bodyHTML = navHTML + bodyHTML
  document.getElementsByTagName('body')[0].innerHTML = bodyHTML;
}

(function () {
  generateNavigationBar();
})();