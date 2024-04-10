export function getCurrentYear() {
  return new Date().getFullYear().toString();
}

export function getCurrentMonth() {
  return (new Date().getMonth() + 1).toString().padStart(2, "0");
}
