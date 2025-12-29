import { getUser } from "../services/auth.js";
import { getItem, setItem } from "../services/storage.js";
import { renderNavbar } from "../components/navbar.js";
import { today } from "../utils/date.js";

// --------------------
// Auth guard
// --------------------
const user = getUser();
if (!user) {
  window.location.href = "./login.html";
}

// --------------------
// Navbar
// --------------------
document
  .getElementById("navbar")
  .appendChild(renderNavbar("habits"));

// --------------------
// State
// --------------------
let habits = getItem("habits") || [];
let habitLogs = getItem("habitLogs") || [];

const habitForm = document.getElementById("habitForm");
const habitList = document.getElementById("habitList");

// --------------------
// Helpers
// --------------------
function save() {
  setItem("habits", habits);
  setItem("habitLogs", habitLogs);
}

function isCompletedToday(habitId) {
  return habitLogs.some(
    (log) =>
      log.habitId === habitId &&
      log.date === today() &&
      log.completed === true
  );
}

function getStreak(habitId) {
  let streak = 0;
  let date = new Date(today());

  if (!todayCompleted) {
    date.setDate(date.getDate() - 1);
  }
  const todayCompleted = habitLogs.some(
    l => l.habitId === habitId && l.date === today() && l.completed
  );
  while (true) {
    const dateStr = date.toISOString().split("T")[0];
    const log = habitLogs.find(
      (l) =>
        l.habitId === habitId &&
        l.date === dateStr &&
        l.completed === true
    );

    if (!log) break;

    streak++;
    date.setDate(date.getDate() - 1);
  }

  return streak;
}

function toggleHabit(habitId) {
  const log = habitLogs.find(
    (l) => l.habitId === habitId && l.date === today()
  );

  if (log) {
    log.completed = !log.completed;
  } else {
    habitLogs.push({
      habitId,
      date: today(),
      completed: true,
    });
  }

  save();
  render();
}

// --------------------
// Render
// --------------------
function render() {
  habitList.innerHTML = "";

  if (habits.length === 0) {
    habitList.innerHTML = "<li>No habits added yet</li>";
    return;
  }

  habits.forEach((habit) => {
    const li = document.createElement("li");

    const completed = isCompletedToday(habit.id);
    const streak = getStreak(habit.id);

    li.innerHTML = `
      <input type="checkbox" ${completed ? "checked" : ""} />
      ${habit.name} — 🔥 ${streak}
    `;

    li.querySelector("input").addEventListener("change", () =>
      toggleHabit(habit.id)
    );

    habitList.appendChild(li);
  });
}

// --------------------
// Events
// --------------------
habitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("habitName").value.trim();
  if (!name) return;

  habits.push({
    id: crypto.randomUUID(),
    name,
    createdAt: today(),
  });

  save();
  habitForm.reset();
  render();
});

// --------------------
// Initial render
// --------------------
render();
