const { remote } = require("electron");

function alertError(title, message) {
  const { dialog } = remote;
  dialog.showErrorBox(title, message);
}

function findNodeByLabel(label, nodes) {
  console.log(nodes);
}

module.exports = { alertError, findNodeByLabel }
