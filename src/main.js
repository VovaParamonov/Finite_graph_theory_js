const creater = require("./creater");

const nodes = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" }
];

const edges = [
  { from: 1, to: 3, label: "3", width: 3 },
  { from: 1, to: 2, label: "5", width: 5 },
  { from: 2, to: 4, label: "1" },
  { from: 2, to: 5, label: "6", width: 6 },
  { from: 3, to: 3, label: "1" }
];

creater.defaultGraph("1", { edges, nodes });
console.log(window["graph-1"]);
