export function isNotEmpty(value) {
  return value && value.trim().length > 0;
}

export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function isPositiveNumber(n) {
  return typeof n === "number" && n > 0;
}