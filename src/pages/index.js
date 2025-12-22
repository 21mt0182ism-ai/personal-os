import { isLoggedIn } from "../services/auth.js";

if (isLoggedIn()) {
  window.location.replace("/public/dashboard.html");
} else {
  window.location.replace("/public/login.html");
}