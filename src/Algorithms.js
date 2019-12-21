// @flow
const {
  getEdgesById,
  getConnectedNodeIdThroughEdge,
  edgesFilter,
  parseToArray
} = require("./functions");

/**
 * @param graph
 */
function prima(graph) {
  const selectedNodes = [];
  const selectedEdges = [];

  const baseNodes = parseToArray(graph.body.nodes, "edge");
  const baseEdges = graph.body.edges;

  selectedNodes.push(baseNodes[0]);

  while (selectedNodes.length < baseNodes.length) {
    let connectedEdges = [];
    selectedNodes.forEach(node => {
      connectedEdges = connectedEdges.concat(node.edges);
    });

    connectedEdges = connectedEdges.filter(edge => {
      return !(
        selectedNodes.find(node => node.id === edge.fromId) &&
        selectedNodes.find(node => node.id === edge.toId)
      );
      // if (selectedNodes.find(node => node.id === edge.fromId) !== undefined) {
      //   return selectedNodes.find(node => node.id === edge.toId) === undefined;
      // }
      //
      // return selectedNodes.find(node => node.id === edge.fromId) === undefined;
    });

    // console.log("connectedEdges",connectedEdges);

    let minEdge;
    connectedEdges.forEach(currentEdge => {
      if (minEdge === undefined) {
        minEdge = currentEdge;
        return null;
      }

      const currentEdgeWeight = parseInt(
        currentEdge.labelModule.lines[0].blocks[0].text,
        10
      );
      const minEdgeWeight = parseInt(
        minEdge.labelModule.lines[0].blocks[0].text,
        10
      );

      if (currentEdgeWeight <= minEdgeWeight) {
        minEdge = currentEdge;
      }
      return null;
    });

    const selectedEdgeFrom = selectedNodes.find(
      node => node.id === minEdge.fromId || node.id === minEdge.toId
    );

    selectedEdges.push(minEdge);

    const newNode = getConnectedNodeIdThroughEdge(selectedEdgeFrom.id, minEdge);

    selectedNodes.push(newNode);
    console.log("newId", newNode.id);
  }
  return selectedEdges;
}

module.exports = {
  prima
};
