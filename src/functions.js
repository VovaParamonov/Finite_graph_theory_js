const { remote } = require("electron");

function alertError(title, message) {
  const { dialog } = remote;
  dialog.showErrorBox(title, message);
}

function calculateDistance(coords1, coords2) {
  const dX = Math.abs(coords1.x - coords2.x);
  const dY = Math.abs(coords1.y - coords2.y);

  return Math.floor(Math.sqrt(dX * dX + dY * dY));
}

/**
 * @param edgeid:
 * arr of edgeId or single edgeId
 * @param edges
 * array of edges
 * @returns:
 * arr of adges
 */
function getEdgesById(edgeid, edges) {
  let edgeIdArr;
  if (!(edgeid instanceof Object)) {
    edgeIdArr = [edgeid];
  } else {
    edgeIdArr = edgeid;
  }
  const resultEdges = {};

  for (const edgeKey in edges) {
    if (edgeIdArr.indexOf(edgeKey) !== -1) {
      resultEdges[edgeKey] = edges[edgeKey];
    }
  }

  return resultEdges;
}



function objectFilter(object, callBack) {
  const resultEdges = {};

  for (const elem in object) {
    if (callBack(object[elem])) resultEdges[elem] = object[elem];
  }
}

/**
 * @returns:
 * node
 */
function getConnectedNodeIdThroughEdge(nodeId, edge) {
  return [edge.from, edge.to].filter(
    connectedNode => connectedNode.id !== nodeId
  )[0];
}

function parseToArray(object, skipStr) {
  const resultArr = [];

  for (const elem in object) {
    if (elem.indexOf(skipStr) !== -1) continue;
    resultArr.push(object[elem]);
  }

  return resultArr;
}

module.exports = {
  alertError,
  calculateDistance,
  getEdgesById,
  getConnectedNodeIdThroughEdge,
  objectFilter,
  parseToArray
};
