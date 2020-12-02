// Firstly we receive the grid itself,strtnode and endnode as parameters to dijkstra method
export function Dijkstra(agrid, startnode, endnode) {
  //edge case remains

  startnode.distance = 0;
  let visitedOrderedNodes = [];
  let unvisitedNodes = [];
  unvisitedNodes = getAllNodes(agrid);
  while (unvisitedNodes.length) {
    SortNodes(unvisitedNodes);
    let closestNode = [];
    closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) {
      continue;
    }
    if (closestNode.distance === Infinity) {
      return visitedOrderedNodes;
    }
    closestNode.isVisited = true;
    visitedOrderedNodes.push(closestNode);
    if (closestNode === endnode) {
      return visitedOrderedNodes;
    }
    UpdateUnvisitedNeighbours(closestNode, agrid);
  }
  //animate
  return;
}
//accepts (nested list) i.e. list of lists of lists
//returns a linear list of lists
function getAllNodes(grid) {
  let longList = [];
  for (let row of grid) {
    for (let cell of row) {
      longList.push(cell);
    }
  }
  return longList;
}
//Sorts a linear list by their 'distance' property
//accepts linear list
//returns sorted list
function SortNodes(unvisitedNodes) {
  //sort method requires comparison function to evaluate any two values according to their ASCII/UTF code
  //based on the sign and magnitude of value it puts the value at appropriate location
  //sort functiuon does not return a new list/array but sorts elements side in place
  unvisitedNodes.sort((one, other) => one.distance - other.distance);
}

//updates the distance of nearest unvisited neighbours to +1 unit than current/closest node's distance
//Also assigns currentnode as the previous node to neighbours to backtrack from any node to start node
function UpdateUnvisitedNeighbours(node, grid) {
  let unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  for (let neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
  }
}

//returns a list of neighbours to current node in the grid
//accepts current node and grid itself to calculate neighbours in 4 directions
//returns atmost 4 neighbors which are unvisited by checking 'isVisited' property
function getUnvisitedNeighbours(node, grid) {
  let neighbours = [];
  if (node.row > 0) neighbours.push(grid[node.row - 1][node.column]);
  if (node.row < grid.length - 1)
    neighbours.push(grid[node.row + 1][node.column]);
  if (node.column > 0) neighbours.push(grid[node.row][node.column - 1]);
  if (node.column < grid[0].length - 1)
    neighbours.push(grid[node.row][node.column + 1]);
  return neighbours.filter((neighbours) => !neighbours.isVisited);
}
export function getShortestPath(endnode) {
  let shortpath = [];
  let current_node = endnode;
  while (current_node != null) {
    shortpath.unshift(current_node);
    current_node = current_node.previousNode;
  }
  return shortpath;
}
export default Dijkstra;
