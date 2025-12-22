import { getUser } from "../services/auth.js";
import { renderNavbar } from "../components/navbar.js";
import { getItem, setItem } from "../services/storage.js";
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
  .appendChild(renderNavbar("dashboard"));

// --------------------
// Date
// --------------------
document.getElementById("date").innerText = `Today: ${today()}`;

// --------------------
// Habits summary
// --------------------
const habits = getItem("habits") || [];
const habitLogs = getItem("habitLogs") || [];

const completedToday = habitLogs.filter(
  (log) => log.date === today() && log.completed
).length;

document.getElementById("habitSummary").innerText =
  habits.length === 0
    ? "No habits created yet"
    : `${completedToday} / ${habits.length} habits completed today`;

// --------------------
// Learning summary (stub, still correct)
// --------------------
const sessions = getItem("learningSessions") || [];
const todaySessions = sessions.filter((s) => s.date === today());
const minutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);

document.getElementById("learningSummary").innerText =
  minutes === 0 ? "No study today" : `${minutes} minutes studied`;

// --------------------
// Health summary (NEW + CORRECT)
// --------------------
const healthLogs = getItem("healthLogs") || [];
const todayHealthLogs = healthLogs.filter(
  (log) => log.date === today()
);

const totalMinutes = todayHealthLogs.reduce(
  (sum, log) => sum + log.duration,
  0
);

document.getElementById("healthSummary").innerText =
  todayHealthLogs.length === 0
    ? "No activity logged today"
    : `${todayHealthLogs.length} activities · ${totalMinutes} minutes`;

// --------------------
// Quick Journal
// --------------------
const journalKey = `journal-${today()}`;
const journalText = document.getElementById("journalText");

journalText.value = getItem(journalKey) || "";

document.getElementById("saveJournal").addEventListener("click", () => {
  setItem(journalKey, journalText.value);
  alert("Saved");
});
