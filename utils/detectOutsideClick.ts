export function detectOutsideClick(mouseEvent: MouseEvent, triggerElement: HTMLElement, callback: Function) {
  if (triggerElement) {
    if (!triggerElement.contains(mouseEvent.target as HTMLElement)) {
      callback();
    }
  }
}
