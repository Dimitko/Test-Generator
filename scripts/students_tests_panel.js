checkLoggedIn();
getStudentInfo();

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

function getStudentInfo() {
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

          let option = document.createElement('option');
          option.text = user_faculty_number;
          option.value = user_faculty_number;
          document.getElementById("user-test-history").appendChild(option);
        } else {
          window.location.replace("http://localhost/Test-Generator/pages/LoginForm.html")
        }
      }
    )
  }

   document.getElementById("user-test-history-button").addEventListener('click', e => {
    faculty_number = document.getElementById("user-test-history").value;
  
    var filename;
    fetch('http://localhost/Test-Generator/api/admin/export.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "data": "user_test_history", "faculty_number": faculty_number })
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

  const showUserTests = e => {
    e.preventDefault();

    faculty_number = document.getElementById("user-test-history").value;

    fetch('http://localhost/Test-Generator/api/history/select.php/byFacultyNumber', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({"faculty_number": faculty_number})
      }).then(
      response => response.json()
      ).then(
        // response => console.log(response.message[1]["score"])
        response => handleShowUserTestsResponse(response)
      )  
  }

function handleShowUserTestsResponse(user_tests) {
    // test_info = document.getElementById("show-tests");
    // if (user_tests.success) {
    //     user_tests.message.forEach(user_test => {
    //         test_info.innerHTML += user_test["timestamp"] + " " + user_test["score"] + '<br />' + '<br />';
    //     })
    // } else {
    //     test_info.innerText = user_tests.message;
    // }

    if (user_tests.success) {
        tests_table = document.getElementById("user-tests-table");
        user_tests_table_head = document.createElement('thead');
        user_tests_table_head_row = document.createElement('tr');
        timestamp_head = document.createElement('th');
        score_head = document.createElement('th');
        timestamp_head.innerHTML = "Време";
        score_head.innerHTML = "Резултат";

        user_tests_table_head_row.appendChild(timestamp_head);
        user_tests_table_head_row.appendChild(score_head);

        user_tests_table_head.appendChild(user_tests_table_head_row);

        tests_table.appendChild(user_tests_table_head);

        tests_table_body = document.getElementById("table-body");

        user_tests.message.forEach(user_test => {
            user_test_row = document.createElement('tr');

            user_test_timestamp_data = document.createElement('td');
            user_test_score_data = document.createElement('td');

            user_test_timestamp_data.innerHTML = user_test["timestamp"];
            user_test_score_data.innerHTML = user_test["score"];

            user_test_row.appendChild(user_test_timestamp_data);
            user_test_row.appendChild(user_test_score_data);

            tests_table_body.appendChild(user_test_row);
        })
    } else {
        test_info.innerText = user_tests.message;
    }
      
}

(function () {
    document.getElementById("show-user-tests").addEventListener('click', showUserTests);
 })();