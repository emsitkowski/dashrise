export function unfocusInputs() {
  document.querySelectorAll("input").forEach((input) => {
    input.blur();
  });
}
export function clearInputs() {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
}
