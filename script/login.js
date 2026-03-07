document.getElementById("login-btn").addEventListener("click", function () {
  const userNameInput = document.getElementById("input-username");
  const userName = userNameInput.value;

  const passwordInput = document.getElementById("input-password");
  const password = passwordInput.value;

  if (userName == "admin" && password == "admin123") {
    window.location.assign("./main.html");
  } else {
    alert("Enter Valid Username and Password");
    return;
  }
});

function addUserName() {
  document.getElementById("input-username").value = "admin";
}

function addPassword() {
  document.getElementById("input-password").value = "admin123";
}
