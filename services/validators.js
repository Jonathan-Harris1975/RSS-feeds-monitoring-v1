export function escapeJson(str) {
  if (!str) return "";
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/`/g, "\\`")
    .trim();
}

export function isPlainText(str) {
  return !/[\n\r\t]/.test(str);
}
