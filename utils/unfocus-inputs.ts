export function unfocusInputs() {
  document.querySelectorAll("input").forEach((input) => {
    input.blur();
  });
}
