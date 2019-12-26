const { remote } = require("electron");
const { domInit } = require("../../DOM");
const creater = require("../../creater");
const {
  alertError,
  calculateDistance,
  parseToArray
} = require("../../functions");
const { prima } = require("../../Algorithms");

const $inputLabel = document.querySelector(".tool-add_node__label");
const $inputPosX = document.querySelector(".tool-add_node__pos_x");
const $inputPosY = document.querySelector(".tool-add_node__pos_y");
const $btnAddNode = document.querySelector(".btn-add_node");
const $btnRunPrima = document.querySelector(".btn-run-prima");
const $toolSection = document.querySelector(".section-interface");

const graphData = creater.defaultGraph(
  "prima",
  {},
  {
    physics: false
  }
);

function formValid() {
  return (
    $inputLabel.value !== "" &&
    $inputPosX.value !== "" &&
    $inputPosY.value !== "" &&
    graphData.graph.findNode($inputLabel.value).length === 0
  );
}

function setEdges(newNode) {
  const visEdges = graphData.data.edges;
  let { nodes } = graphData.graph.body;

  const edgesArr = [];

  nodes = parseToArray(nodes, "edge");

  nodes.forEach(node => {
    if (node.id === newNode.id) return;

    const distance = calculateDistance(
      { x: newNode.x, y: newNode.y },
      { x: node.x, y: node.y }
    );

    edgesArr.push({
      id: visEdges.length + edgesArr.length + 1,
      from: newNode.id,
      to: node.id,
      label: distance.toString()
    });
  });

  visEdges.add(edgesArr);
}

function addNode() {
  if (!formValid()) {
    if (graphData.graph.findNode($inputLabel.value).length !== 0) {
      return alertError("Ошибка валидации", "Точка с данным id уже существует");
    }
    return alertError("Ошибка ваолидации", "Заполните все поля");
  }

  const { nodes } = graphData.data;

  const newNode = {
    id: $inputLabel.value,
    label: $inputLabel.value,
    x: $inputPosX.value,
    y: $inputPosY.value,
    fixed: {
      x: true,
      y: true
    }
  };

  nodes.add(newNode);

  $inputLabel.value = nodes.length + 1;
  $inputPosX.value = "";
  $inputPosY.value = "";
  $inputPosX.focus();

  setEdges(newNode);
}

function startPrima() {
  return prima(graphData.graph);
}

function btnAddHandler(e) {
  e.preventDefault();
  addNode();
}

function btnRunHandler(e) {
  e.preventDefault();

  const newEdges = startPrima().map(edge => ({
    id: edge.id,
    from: edge.fromId,
    to: edge.toId,
    label: edge.labelModule.lines[0].blocks[0].text
  }));

  graphData.graph.setData({
    nodes: graphData.data.nodes,
    edges: newEdges
  });

  $toolSection.style.display = "none";
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
$btnRunPrima.addEventListener("click", btnRunHandler);
