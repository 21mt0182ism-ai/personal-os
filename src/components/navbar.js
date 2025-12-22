import { logout } from "../services/auth.js";

export function renderNavbar(activePage) {
  const nav = document.createElement("nav");
  nav.style.borderBottom = "1px solid #ccc";
  nav.style.padding = "10px";
  nav.style.marginBottom = "20px";

  nav.innerHTML = `
    <strong>Personal Life OS</strong>
    |
    <a href="/public/dashboard.html" data-page="dashboard">Dashboard</a>
    |
    <a href="/public/habits.html" data-page="habits">Habits</a>
    |
    <a href="/public/learning.html" data-page="learning">Learning</a>
    |
    <a href="/public/health.html" data-page="health">Health</a>
    |
    <a href="/public/journal.html" data-page="journal">Journal</a>
    |
    <a href="/public/reports.html" data-page="reports">Reports</a>
    |
    <button id="logoutBtn">Logout</button>
  `;

  // Highlight active page
  nav.querySelectorAll("a").forEach((link) => {
    if (link.dataset.page === activePage) {
      link.style.fontWeight = "bold";
      link.style.textDecoration = "underline";
    }
  });

  nav.querySelector("#logoutBtn").addEventListener("click", logout);

  return nav;
}
