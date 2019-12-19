const { remote } = require("electron");
const { domInit } = require("../../DOM");
const creater = require("../../creater");
const { alertError, findNodeByLabel } = require("../../functions");

const $inputLabel = document.querySelector(".tool-add_node__label");
const $inputPosX = document.querySelector(".tool-add_node__pos_x");
const $inputPosY = document.querySelector(".tool-add_node__pos_y");
const $btnAddNode = document.querySelector(".btn-add_node");

const graphData = creater.defaultGraph(
  "prima",
  {},
  {
    physics: false
  }
);

// findNodeByLabel("test", graphData.data.nodes);

function formValid() {
  return (
    $inputLabel.value !== "" &&
    $inputPosX.value !== "" &&
    $inputPosY.value !== "" &&
    graphData.graph.findNode($inputLabel.value).length === 0
  );
}

function addNode() {
  if (!formValid()) {
    if (graphData.graph.findNode($inputLabel.value).length !== 0) {
      return alertError("Ошибка валидации", "Точка с данным id уже существует");
    }
    return alertError("Ошибка ваолидации", "Заполните все поля");
  }

  const { nodes } = graphData.data;

  nodes.add({
    id: $inputLabel.value,
    label: $inputLabel.value,
    x: $inputPosX.value,
    y: $inputPosY.value,
    fixed: {
      x: true,
      y: true
    }
  });
}

function btnAddHandler(e) {
  e.preventDefault();
  addNode();
}

[$inputLabel, $inputPosY, $inputPosX].forEach(el => {
  el.addEventListener("keydown", e => {
    if (e.code === "Enter") {
      $btnAddNode.click();
    }
  });
});

domInit(remote);

$btnAddNode.addEventListener("click", btnAddHandler);
