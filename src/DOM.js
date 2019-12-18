// @flow

function domInit(remote) {
  const $btnClose = document.querySelector("#btn-close");

  (function setEvents() {
    $btnClose.addEventListener("click", () => {
      const window = remote.getCurrentWindow();
      window.close();
    });
  })();
}

module.exports = { domInit };
