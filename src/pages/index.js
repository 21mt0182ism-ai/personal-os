import { isLoggedIn } from "../services/auth.js";

if (isLoggedIn()) {
  window.location.replace("/public/dashboard.html");
} else {
  window.location.replace("/public/login.html");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(reg => console.log("Service Worker registered", reg))
      .catch(err => console.error("Service Worker registration failed", err));
  });
}
