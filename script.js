document.getElementById("login-btn").addEventListener("click", () => {
  const userNameValue = document.getElementById("username-input").value;
  const passwordValue = document.getElementById("password-input").value;

  if (userNameValue === "admin" && passwordValue === "admin123") {
    alert("Login Successful");
    window.location.assign("./home.html");
  } else {
    alert("Invalid username or password");
  }
});
