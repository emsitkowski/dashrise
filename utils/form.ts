export function unfocusInputs() {
  document.querySelectorAll("input").forEach((input) => {
    input.blur();
  });
}
export function clearInputs() {
  document.querySelectorAll("input[type='text']").forEach((input) => {
    (input as HTMLInputElement).value = "";
  });
}
