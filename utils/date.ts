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

export const monthsList = [
  { name: "January", value: "01" },
  { name: "February", value: "02" },
  { name: "March", value: "03" },
  { name: "April", value: "04" },
  { name: "May", value: "05" },
  { name: "June", value: "06" },
  { name: "July", value: "07" },
  { name: "August", value: "08" },
  { name: "September", value: "09" },
  { name: "October", value: "10" },
  { name: "November", value: "11" },
  { name: "December", value: "12" },
];
