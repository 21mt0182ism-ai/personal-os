import { getItem, setItem, removeItem } from "./storage.js";

export function login(email, password) {
  // v1: no real hashing, just structure
  const user = { email };
  setItem("user", user);
  return true;
}

export function logout() {
  removeItem("user");
  window.location.href = "/public/login.html";
}

export function getUser() {
  return getItem("user");
}

export function isLoggedIn() {
  return !!getItem("user");
}
