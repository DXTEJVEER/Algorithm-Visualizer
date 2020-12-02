export function Astar(grid, startnode, endnode) {
  let visitedList = [];

  let openlist = [];
  openlist.push(startnode);
  let closedlist = [];
  while (openlist.length > 0) {
    let currentNode = lowestFcostNode(openlist);
    visitedList.push(currentNode);
    //openlist.spl;
    openlist.splice(openlist.indexOf(currentNode), 1);
    closedlist.push(currentNode);

    if (currentNode === endnode) {
      return visitedList;
    }
    let neighbourlist = getNeighboursOfCurrentNode(currentNode, grid);
    for (let neighbour of neighbourlist) {
      //visitedList.push(neighbour);
      if (
        neighbour.isWall ||
        (closedlist.indexOf(neighbour) === -1 ? false : true)
      ) {
        continue;
      }
      let newDistance = currentNode.gCost + getDistance(currentNode, neighbour);
      if (
        newDistance < neighbour.gCost ||
        !(openlist.indexOf(neighbour) === -1 ? false : true)
      ) {
        //newpath to neighbour is shorter
        neighbour.gCost = newDistance;
        neighbour.hCost = getDistance(neighbour, endnode);
        neighbour.fCost = neighbour.gCost + neighbour.hCost;
        neighbour.previousNode = currentNode;
        if (!openlist.indexOf(neighbour) === -1 ? false : true) {
          openlist.push(neighbour);
        }
      }
    }
  }
  return visitedList;
}
export function tracePath(endnode) {
  let short_path = [];
  let currentnode = endnode;
  while (currentnode != null) {
    short_path.unshift(currentnode);
    currentnode = currentnode.previousNode;
  }
  return short_path;
}
function getDistance(nodeA, nodeB) {
  let distanceX = Math.abs(nodeA.row - nodeB.row);
  let distanceY = Math.abs(nodeA.column - nodeB.column);
  return distanceX + distanceY;
}

function getNeighboursOfCurrentNode(node, grid) {
  let neighbours = [];
  if (node.row > 0) {
    neighbours.push(grid[node.row - 1][node.column]);
  }
  if (node.row < grid.length - 1) {
    neighbours.push(grid[node.row + 1][node.column]);
  }
  if (node.column > 0) {
    neighbours.push(grid[node.row][node.column - 1]);
  }
  if (node.column < grid[0].length - 1) {
    neighbours.push(grid[node.row][node.column + 1]);
  }
  return neighbours;
}

function lowestFcostNode(openlist) {
  let lowest = openlist[0];
  for (let i = 1; i < openlist.length; i++) {
    if (
      openlist[i].fCost < lowest.fCost ||
      (openlist[i].fCost === lowest.fCost && openlist[i].hCost < lowest.hCost)
    ) {
      lowest = openlist[i];
    }
  }
  return lowest;
}

export default Astar;
