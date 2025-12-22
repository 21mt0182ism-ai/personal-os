const STORAGE_KEY = "personal_life_os";

function getStore() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getItem(key) {
  const store = getStore();
  return store[key];
}

export function setItem(key, value) {
  const store = getStore();
  store[key] = value;
  saveStore(store);
}

export function removeItem(key) {
  const store = getStore();
  delete store[key];
  saveStore(store);
}

export function getAll() {
  return JSON.parse(localStorage.getItem("personal_life_os")) || {};
}
