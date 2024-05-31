function disableScrollbar() {
  const documentElement = document.documentElement;
  const body = document.body;
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  // disable scroll for html and body elements
  documentElement.setAttribute("data-disable-scroll", "true");
  body.setAttribute("data-disable-scroll", "true");

  // adjust padding to prevent page shift
  documentElement.style.paddingRight = scrollBarWidth + "px";
}

function enableScrollbar() {
  const documentElement = document.documentElement;
  const body = document.body;

  // enable scroll for html and body elements
  documentElement.removeAttribute("data-disable-scroll");
  body.removeAttribute("data-disable-scroll");

  // restore initial padding value
  documentElement.style.paddingRight = "0px";
}

export { disableScrollbar, enableScrollbar };
