import { login } from "../services/auth.js";
import { isNotEmpty, isValidEmail } from "../utils/validation.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // ---- Validation ----
  if (!isNotEmpty(email)) {
    alert("Email cannot be empty");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (!isNotEmpty(password)) {
    alert("Password cannot be empty");
    return;
  }

  // ---- Login ----
  login(email, password);
  window.location.href = "/public/dashboard.html";
});
