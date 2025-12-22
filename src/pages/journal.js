import { getUser } from "../services/auth.js";
import { renderNavbar } from "../components/navbar.js";
import { getItem, setItem, getAll } from "../services/storage.js";
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
  .appendChild(renderNavbar("journal"));

// --------------------
// Elements
// --------------------
const todayTextarea = document.getElementById("todayJournal");
const saveBtn = document.getElementById("saveToday");
const journalList = document.getElementById("journalList");

// --------------------
// Today journal
// --------------------
const todayKey = `journal-${today()}`;
todayTextarea.value = getItem(todayKey) || "";

saveBtn.addEventListener("click", () => {
  setItem(todayKey, todayTextarea.value);
  renderPast();
  alert("Saved");
});

// --------------------
// Past entries
// --------------------
function renderPast() {
  journalList.innerHTML = "";

  const store = getAll();

  const pastEntries = Object.keys(store)
    .filter((key) => key.startsWith("journal-"))
    .map((key) => ({
      date: key.replace("journal-", ""),
      text: store[key],
    }))
    .filter((entry) => entry.date !== today())
    .sort((a, b) => b.date.localeCompare(a.date));

  if (pastEntries.length === 0) {
    journalList.innerHTML = "<li>No past entries yet</li>";
    return;
  }

  pastEntries.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${entry.date}</strong><br />
      <pre>${entry.text}</pre>
    `;
    journalList.appendChild(li);
  });
}

// --------------------
// Initial render
// --------------------
renderPast();
