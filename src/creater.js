// flow

const vis = require("vis-network");
const settings = require("../settings");
const { parseToArray } = require("./functions");

const selectedSettings = settings.default;

const creater = {
  /**
   * @param container:
   * "string" (id) | "Object" (DOM element)
   * @param data
   * @param options
   * @returns {{data: { nodes: vis.data, edges: vis.data }, graph: *}}
   */
  defaultGraph: (container, data, options) => {
    options = options || {};

    // set default color from settings for nodes
    if (selectedSettings.nodeColor.length !== 0) {
      data.nodes = data.nodes.map(node =>
        Object.assign(node, { color: selectedSettings.nodeColor })
      );
    }

    const nodes = new vis.DataSet(data.nodes);
    const edges = new vis.DataSet(data.edges);

    let $container;

    data = { nodes, edges };
    if (typeof container === "string") {
      $container = document.querySelector(`#graph_place-${container}`);

      if ($container) {
        if (window[`graph-${container}`]) {
          window[`graph-${container}`].destroy();
          window[`graph-${container}`] = null;
        }
      } else {
        $container = document.createElement("div");
        $container.id = `graph_place-${container}`;
        $container.className = "graph_place";

        document.body.appendChild($container);
      }
    } else {
      $container = container;
    }

    const graph = new vis.Network($container, data, options);

    console.log(graph, data);

    return {
      graph,
      data
    };
  }
};

module.exports = creater;
