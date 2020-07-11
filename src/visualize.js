import * as d3 from 'd3';
const { cluster, hierarchy, select } = d3;

// set the dimensions and margins of the graph
const WIDTH = 460;
const HEIGHT = 460;

export default function visualize(data, callbacks) {
  if (!data) return;
  var svg = createSvgCanvas(WIDTH, HEIGHT);

  // Create the cluster layout:
  var dataCluster = cluster().size([HEIGHT, WIDTH - 100]); // 100 is the margin I will have on the right side

  render(data, dataCluster, svg, callbacks);
}

function render(data, cluster, svg, callbacks) {
  var root = hierarchy(data, function (d) {
    return d.children || d.child_languages || d.local_languages;
  });
  cluster(root);

  // Add the links between nodes:
  addLinks(root, svg);
  // Add a circle for each node.
  addCircles(root, svg, callbacks);
}

function createSvgCanvas(width, height) {
  select('#svg').select('g').remove();
  return select('#svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(40,0)');
}

function addCircles(rootNode, svg, callbacks) {
  svg
    .selectAll('g')
    .data(rootNode.descendants())
    .enter()
    .append('g')
    .attr('transform', function (d) {
      return 'translate(' + d.y + ',' + d.x + ')';
    })
    .append('circle')
    .attr('r', 7)
    .style('fill', (d) => (d.data.selectedNode ? '#00c3ff' : '#ff7b00'))
    .attr('stroke', 'black')
    .style('stroke-width', 2)
    .style('cursor', 'pointer')
    .on('mouseover', callbacks.mouseover)
    .on('mouseleave', callbacks.mouseleave)
    .on('click', (d) => callbacks.selectNode(d.data));
}

function addLinks(rootNode, svg) {
  svg
    .selectAll('path')
    .data(rootNode.descendants().slice(1))
    .enter()
    .append('path')
    .attr('d', drawLines)
    .style('fill', 'none')
    .attr('stroke', '#ccc');
}

function drawLines(d) {
  const { x, y, parent } = d;
  return `M ${y}, ${x}C${parent.y + 50}, ${x} ${parent.y + 50}, ${parent.x} ${
    parent.y
  }, ${parent.x}`;
}
