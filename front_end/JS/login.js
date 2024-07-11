//Login Button EventListener
function sigin_login() {
    var username = document.getElementById("user").value;
    var password = document.getElementById("password").value;
  
    /*Check username and password*/
    if (username == "admin, first, ali, derrick" && password == "admin, first, ali, derrick") {
      window.location.href = "dashboard.html";
  
      return false;
    } else {
      alert("Wrong Username or Password! Please try again");
    }
  }