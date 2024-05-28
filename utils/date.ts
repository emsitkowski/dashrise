export function getCurrentYear() {
  return new Date().getFullYear().toString();
}

export function getCurrentMonth() {
  return (new Date().getMonth() + 1).toString().padStart(2, "0");
}

export function getCurrentMonthName() {
  return new Date().toLocaleString("en-US", { month: "long" });
}

export function getCurrentDate() {
  return { year: getCurrentYear(), month: getCurrentMonth() };
}
