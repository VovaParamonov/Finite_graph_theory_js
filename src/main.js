// @flow

const creater = require("./creater");
const remote = require("electron").remote;
const { Window } = require("./electron");
const { domInit } = require("./DOM");

domInit(remote);

(function mainMenuInit() {
  const $linkPrima = document.querySelector(".link-prima");
  const $linkCraskala = document.querySelector(".link-craskala");
  const $linkTrail = document.querySelector(".link-trail");
  const $linkMaxMin = document.querySelector(".link-max_min");

  $linkPrima.addEventListener("click", () => {
    const prima = new Window({}, "src/windows/prima/prima.html");
  });
  $linkCraskala.addEventListener("click", () => {
    const craskala = new Window({}, "src/windows/craskala/craskala.html");
  });
})();

