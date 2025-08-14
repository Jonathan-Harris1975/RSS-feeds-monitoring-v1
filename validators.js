// src/validators.js

// Escape JSON-sensitive characters
export function escapeJson(str) {
  if (!str) return "";
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/`/g, "\\`")
    .trim();
}

// Validate no line breaks or tabs
export function isPlainText(str) {
  return !/[\n\r\t]/.test(str);
}
