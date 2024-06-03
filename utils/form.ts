export function unfocusInputs() {
  document.querySelectorAll("input").forEach((input) => {
    input.blur();
  });
}
export function clearAllTextAndNumberInputs() {
  document.querySelectorAll("input").forEach((input) => {
    if (input.type === "text" || input.type === "number") {
      (input as HTMLInputElement).value = "";
    }
  });
}
