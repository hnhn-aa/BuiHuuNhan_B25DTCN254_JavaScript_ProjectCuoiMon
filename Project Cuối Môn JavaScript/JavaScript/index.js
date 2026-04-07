let buttonSignUpElement = document.getElementById("sign-up");
let buttonSignInElement = document.getElementById("sign-in");

buttonSignInElement.addEventListener("click", () => {
  window.location.href = "./HTML/login.html";
});

buttonSignUpElement.addEventListener("click", () => {
  window.location.href = "./HTML/register.html";
});