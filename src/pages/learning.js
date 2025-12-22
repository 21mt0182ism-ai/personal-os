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
  .appendChild(renderNavbar("learning"));

// --------------------
// State
// --------------------
let learningSessions = getItem("learningSessions") || [];
let editingSessionId = null;

const learningForm = document.getElementById("learningForm");
const learningList = document.getElementById("learningList");

// --------------------
// Helpers
// --------------------
function save() {
  setItem("learningSessions", learningSessions);
}

function getTodaySessions() {
  return learningSessions.filter(
    (session) => session.date === today()
  );
}

// --------------------
// Render
// --------------------
function render() {
  learningList.innerHTML = "";

  const todaySessions = getTodaySessions();

  if (todaySessions.length === 0) {
    learningList.innerHTML = "<li>No study sessions today</li>";
    return;
  }

  todaySessions.forEach((session) => {
    const li = document.createElement("li");

    const hours = Math.floor(session.duration / 60);
    const minutes = session.duration % 60;

    li.innerHTML = `
      <strong>${session.skill}</strong>
      — ${hours ? `${hours}h ` : ""}${minutes}m
      ${session.notes ? `(${session.notes})` : ""}
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;

    li.querySelector(".edit").addEventListener("click", () => {
      startEdit(session);
    });

    li.querySelector(".delete").addEventListener("click", () => {
      learningSessions = learningSessions.filter(
        (s) => s.id !== session.id
      );
      save();
      render();
    });

    learningList.appendChild(li);
  });
}

// --------------------
// Edit logic
// --------------------
function startEdit(session) {
  document.getElementById("skill").value = session.skill;
  document.getElementById("hours").value = Math.floor(session.duration / 60);
  document.getElementById("minutes").value = session.duration % 60;
  document.getElementById("notes").value = session.notes || "";

  editingSessionId = session.id;
}

// --------------------
// Events
// --------------------
learningForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const skill = document.getElementById("skill").value.trim();
  const hours = Number(document.getElementById("hours").value || 0);
  const minutes = Number(document.getElementById("minutes").value || 0);
  const notes = document.getElementById("notes").value.trim();

  const duration = hours * 60 + minutes;
  if (!skill || duration <= 0) return;

  if (editingSessionId) {
    const session = learningSessions.find(
      (s) => s.id === editingSessionId
    );
    session.skill = skill;
    session.duration = duration;
    session.notes = notes;
    editingSessionId = null;
  } else {
    learningSessions.push({
      id: crypto.randomUUID(),
      skill,
      duration,
      notes,
      date: today(),
    });
  }

  save();
  learningForm.reset();
  render();
});

// --------------------
// Initial render
// --------------------
render();
