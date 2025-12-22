import { getUser } from "../services/auth.js";
import { renderNavbar } from "../components/navbar.js";
import { getItem, getAll } from "../services/storage.js";
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
  .appendChild(renderNavbar("reports"));

// --------------------
// Date helpers
// --------------------
function lastNDays(n) {
  const days = [];
  const base = new Date(today());

  for (let i = 0; i < n; i++) {
    const d = new Date(base);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }

  return days;
}

//Download report function
function downloadCSV(filename, rows) {
  const csvContent =
    rows.map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


const last7Days = lastNDays(7);

// --------------------
// Habits report
// --------------------
const habits = getItem("habits") || [];
const habitLogs = getItem("habitLogs") || [];

let habitCompletions = 0;
let habitPossible = habits.length * last7Days.length;

habitLogs.forEach((log) => {
  if (last7Days.includes(log.date) && log.completed) {
    habitCompletions++;
  }
});

document.getElementById("habitReport").innerText =
  habits.length === 0
    ? "No habits tracked in this period"
    : `${habitCompletions} / ${habitPossible} habit completions in last 7 days`;

// --------------------
// Learning report
// --------------------
const learningSessions = getItem("learningSessions") || [];

const learningMinutes = learningSessions
  .filter((s) => last7Days.includes(s.date))
  .reduce((sum, s) => sum + s.duration, 0);

document.getElementById("learningReport").innerText =
  learningMinutes === 0
    ? "No study sessions in last 7 days"
    : `${learningMinutes} minutes studied in last 7 days`;

// --------------------
// Health report
// --------------------
const healthLogs = getItem("healthLogs") || [];

const healthMinutes = healthLogs
  .filter((log) => last7Days.includes(log.date))
  .reduce((sum, log) => sum + log.duration, 0);

document.getElementById("healthReport").innerText =
  healthMinutes === 0
    ? "No physical activity in last 7 days"
    : `${healthMinutes} minutes of activity in last 7 days`;

// --------------------
// Journal report (CORRECTED)
// --------------------
const store = getAll();

const journalEntriesLast7Days = Object.keys(store)
  .filter((key) => key.startsWith("journal-"))
  .map((key) => key.replace("journal-", ""))
  .filter((date) => last7Days.includes(date));

document.getElementById("journalReport").innerText =
  journalEntriesLast7Days.length === 0
    ? "No journal entries in last 7 days"
    : `${journalEntriesLast7Days.length} journal entries in last 7 days`;

document.getElementById("exportCsv").addEventListener("click", () => {
  const csvRows = [
    ["category", "metric", "value"],
    ["habits", "possible_completions", habitPossible],
    ["habits", "actual_completions", habitCompletions],
    ["learning", "total_minutes", learningMinutes],
    ["health", "total_minutes", healthMinutes],
    ["journal", "entries_count", journalEntriesLast7Days.length],
  ];

  downloadCSV(
    `personal_life_os_report_${today()}.csv`,
    csvRows
  );
});

//Optional upgrades:
// Per-day rows instead of totals
// Separate CSVs per category
// Monthly export
// Auto-email report
// JSON export for APIs