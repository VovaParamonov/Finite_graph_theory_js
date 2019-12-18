// flow

const vis = require("vis-network");
const settings = require("../settings");

const selectedSettings = settings.default;

const creater = {
  defaultGraph: (containerId, data, options) => {
    options = options || {};

    // set default color from settings for nodes
    if (selectedSettings.nodeColor.length !== 0) {
      data.nodes = data.nodes.map(node =>
        Object.assign(node, { color: selectedSettings.nodeColor })
      );
    }

    const nodes = new vis.DataSet(data.nodes);
    const edges = new vis.DataSet(data.edges);

    data = { nodes, edges };

    let $container = document.querySelector(`#graph_place-${containerId}`);

    if ($container) {
      window[`graph-${containerId}`].destroy();
      window[`graph-${containerId}`] = null;
    } else {
      $container = document.createElement("div");
      $container.id = `graph_place-${containerId}`;
      $container.className = "graph_place";

      document.body.appendChild($container);
    }

    window[`graph-${containerId}`] = new vis.Network($container, data, options);
  }
};

module.exports = creater;
