function disableScrollbar() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.classList.add("overflow-hidden");
  document.body.classList.add("overflow-hidden");
  document.documentElement.style.paddingRight = scrollBarWidth + "px";
}

function enableScrollbar() {
  document.documentElement.classList.remove("overflow-hidden");
  document.body.classList.remove("overflow-hidden");
  document.documentElement.style.paddingRight = "0px";
}

export { disableScrollbar, enableScrollbar };
