// @flow

function domInit(remoute) {
  const $btnClose = document.querySelector("#btn-close");

  (function setEvents() {
    $btnClose.addEventListener("click", () => {
      const window = remoute.getCurrentWindow();
      window.close();
    });
  })();
}

module.exports = { domInit };
