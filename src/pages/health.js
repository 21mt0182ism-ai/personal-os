import { getUser } from "../services/auth.js";
import { getItem, setItem } from "../services/storage.js";
import { renderNavbar } from "../components/navbar.js";
import { today } from "../utils/date.js";

// --------------------
// Auth guard
// --------------------
const user = getUser();
if (!user) {
  window.location.href = "/public/login.html";
}

// --------------------
// Navbar
// --------------------
document
  .getElementById("navbar")
  .appendChild(renderNavbar("health"));

// --------------------
// State
// --------------------
let healthLogs = getItem("healthLogs") || [];

const healthForm = document.getElementById("healthForm");
const healthList = document.getElementById("healthList");

// --------------------
// Helpers
// --------------------
function save() {
  setItem("healthLogs", healthLogs);
}

function getTodayLogs() {
  return healthLogs.filter((log) => log.date === today());
}

// --------------------
// Render
// --------------------
function render() {
  healthList.innerHTML = "";

  const todayLogs = getTodayLogs();

  if (todayLogs.length === 0) {
    healthList.innerHTML = "<li>No activity logged today</li>";
    return;
  }

  todayLogs.forEach((log) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${log.activity}</strong>
      — ${log.duration} min
      ${log.notes ? `(${log.notes})` : ""}
    `;

    healthList.appendChild(li);
  });
}

// --------------------
// Events
// --------------------
healthForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const activity = document.getElementById("activity").value.trim();
  const duration = Number(document.getElementById("duration").value);
  const notes = document.getElementById("notes").value.trim();

  if (!activity || duration <= 0) return;

  healthLogs.push({
    id: crypto.randomUUID(),
    activity,
    duration,
    notes,
    date: today(),
  });

  save();
  healthForm.reset();
  render();
});

// --------------------
// Initial render
// --------------------
render();
