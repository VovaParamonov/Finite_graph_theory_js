const { remote } = require("electron");
const { domInit } = require("../../DOM");
const creater = require("../../creater");
const { alertError } = require("../../functions");
const { craskala } = require("../../Algorithms");

const $inputLength = document.querySelector(".tool-add_edge__length");
const $inputNode1 = document.querySelector(".tool-add_edge__node1");
const $inputNode2 = document.querySelector(".tool-add_edge__node2");
const $btnAddEdge = document.querySelector(".btn-add_edge");
const $btnRunCraskala = document.querySelector(".btn-run-craskala");
const $toolSection = document.querySelector(".section-interface");

const graphData = creater.defaultGraph(
  "craskala",
  {},
  {
    physics: true
  }
);


const visNodes = graphData.data.nodes;
const visEdges = graphData.data.edges;

function formValid() {
  return (
    $inputLength.value.trim() !== "" &&
    $inputNode1.value.trim() !== "" &&
    $inputNode2.value.trim() !== "" &&
    $inputNode1.value.trim() !== $inputNode2.value.trim()
  );
}

function addEdge() {
  if (!formValid()) {
    if ($inputNode1.value.trim() === $inputNode2.value.trim()) {
      return alertError("Ошибка валидации", "Объект не может быть соеденён с самим собой")
    }
    return alertError("Ошибка валидации", "Ошибка валидации");
  }

  if (graphData.graph.findNode($inputNode1.value).length === 0) {
    visNodes.add({ id: $inputNode1.value, label: $inputNode1.value });
  }
  if (graphData.graph.findNode($inputNode2.value).length === 0) {
    visNodes.add({ id: $inputNode2.value, label: $inputNode2.value });
  }

  visEdges.add({
    id: visEdges.length + 1,
    from: $inputNode1.value.trim(),
    to: $inputNode2.value.trim(),
    label: $inputLength.value,
    length: $inputLength.value
  });

  return null;
}

function btnAddHandler(e) {
  e.preventDefault();
  addEdge();
}

function btnRunHandler(e) {
  e.preventDefault();
  craskala(graphData.graph);
}

domInit(remote);

[$inputNode1, $inputNode2, $inputLength].forEach(el => {
  el.addEventListener("keydown", e => {
    if (e.code === "Enter") {
      $btnAddEdge.click();
    }
  });
});

$btnAddEdge.addEventListener("click", btnAddHandler);
$btnRunCraskala.addEventListener("click", btnRunHandler);
