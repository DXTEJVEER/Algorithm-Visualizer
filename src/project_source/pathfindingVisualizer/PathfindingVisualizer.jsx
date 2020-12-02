import React, { Component } from "react";
import { Dijkstra, getShortestPath } from "../algorithms/Dijkstra";
import { Astar, tracePath } from "../algorithms/Astar";
import Grid from "./Grid";
import * as Selection from "../SelectScreen";

let START_NODE_ROW = 9;
let START_NODE_COL = 15;
let END_NODE_ROW = 9;
let END_NODE_COL = 59;
let mousepressed = false;
let lastKnownPosition = [];
class PathfindingVisualizer extends Component {
  //First the constructor is created with state
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.enableHalfHeader = this.enableHalfHeader.bind(this);
    this.enableFullHeader = this.enableFullHeader.bind(this);
    this.generateRandomWalls = this.generateRandomWalls.bind(this);
    this.incSpeed = this.incSpeed.bind(this);
    this.decSpeed = this.decSpeed.bind(this);
    this.state = {
      //the state holds the Grid information
      //which is row no., column no. along with other properties
      grid: [],
      mouseIsPressed: false,
      draggingStart: false,
      draggingEnd: false,
      speed: 5,
      isDoneVisualizing: false,
    };
  }
  handleMouseDown(row, col) {
    lastKnownPosition = [row, col];
    if (row === START_NODE_ROW && col === START_NODE_COL) {
      this.setState({ draggingStart: true });
    } else if (row === END_NODE_ROW && col === END_NODE_COL) {
      this.setState({ draggingEnd: true });
    } else {
      mousepressed = true;
      if (document.getElementById(`r${row}c${col}`).className === "node ") {
        document.getElementById(`r${row}c${col}`).className = "node node-wall";
      } else if (
        document.getElementById(`r${row}c${col}`).className === "node node-wall"
      ) {
        document.getElementById(`r${row}c${col}`).className = "node ";
      }
    }
  }
  handleMouseLeave(row, col) {
    if (this.state.draggingStart) {
      if (row === END_NODE_ROW && col === END_NODE_COL) {
        return;
      }
    }
    if (this.state.draggingEnd) {
      if (row === START_NODE_ROW && col === START_NODE_COL) {
        return;
      }
    }
    lastKnownPosition = [row, col];
  }
  handleMouseLeaveAction() {
    if (this.state.draggingStart) {
      document.getElementById(
        `r${lastKnownPosition[0]}c${lastKnownPosition[1]}`
      ).className = "node ";
    }
    if (this.state.draggingEnd) {
      document.getElementById(
        `r${lastKnownPosition[0]}c${lastKnownPosition[1]}`
      ).className = "node ";
    }
  }
  handleMouseEnter(row, col) {
    if (this.state.draggingStart) {
      if (row === END_NODE_ROW && col === END_NODE_COL) {
        return;
      }
      this.handleMouseLeaveAction();
      START_NODE_ROW = row;
      START_NODE_COL = col;
      document.getElementById(`r${row}c${col}`).className = "node node-start";
    }
    if (this.state.draggingEnd) {
      if (row === START_NODE_ROW && col === START_NODE_COL) {
        return;
      }
      this.handleMouseLeaveAction();
      END_NODE_ROW = row;
      END_NODE_COL = col;
      document.getElementById(`r${row}c${col}`).className = "node node-end";
    }
    if (!mousepressed) {
      return;
    }
    if (document.getElementById(`r${row}c${col}`).className === "node ") {
      document.getElementById(`r${row}c${col}`).className = "node node-wall";
    } else if (
      document.getElementById(`r${row}c${col}`).className === "node node-wall"
    ) {
      document.getElementById(`r${row}c${col}`).className = "node ";
    }
  }

  handleMouseUp(row, col) {
    mousepressed = false;
    const wallGrid = explicitWallGrid(this.state.grid);
    this.setState({
      grid: wallGrid,
      mouseIsPressed: false,
      draggingStart: false,
      draggingEnd: false,
    });
  }
  componentDidMount() {
    // Third, After the Render method is executed this method is automatically called
    const agrid = getInitialGrid();
    this.setState({ grid: agrid });
  }

  disableHeader() {
    document.getElementById("header").className = "disabled-content";
    document.getElementById("hbtn1").disabled = true;
    document.getElementById("hbtn1").style.color = "gray";
    document.getElementById("hbtn2").disabled = true;
    document.getElementById("hbtn2").style.color = "gray";
    document.getElementById("hbtn3").disabled = true;
    document.getElementById("hbtn3").style.color = "gray";
    document.getElementById("hbtn4").disabled = true;
    document.getElementById("upper-board-layer").style.pointerEvents = "none";
  }
  enableHalfHeader(pLen) {
    document.getElementById("header").className = "active-content";
    document.getElementById("hbtn4").disabled = false;
    if (pLen > 1) {
      document.getElementById("path-count").innerHTML = `SHORTEST-PATH - ${
        pLen - 1
      } UNITS`;
    }
    this.setState({ isDoneVisualizing: true });
  }
  enableFullHeader() {
    document.getElementById("hbtn1").disabled = false;
    document.getElementById("hbtn1").style.color = "white";
    document.getElementById("hbtn2").disabled = false;
    document.getElementById("hbtn2").style.color = "white";
    document.getElementById("hbtn3").disabled = false;
    document.getElementById("hbtn3").style.color = "white";
    document.getElementById(
      "path-count"
    ).innerHTML = `SHORTEST-PATH - INFINITE UNITS`;
    document.getElementById("upper-board-layer").style.pointerEvents = "all";
    this.setState({ isDoneVisualizing: false });
  }
  visualizeDijkstra() {
    let delay = this.state.speed;
    this.disableHeader();
    //Sixth, When button is pressed method is called
    //we get the list in return which has the order of visiting of nodes
    //IMPORTANT this is linear array/list
    let startnode = this.state.grid[START_NODE_ROW][START_NODE_COL];
    let endingnode = this.state.grid[END_NODE_ROW][END_NODE_COL];
    let visitedNodesInOrder = Dijkstra(this.state.grid, startnode, endingnode);
    // console.log(`length of Dijkstra nodes- ${visitedNodesInOrder.length}`);

    let shortestPath = getShortestPath(endingnode);

    //we use this order list to animate the dijkstra
    //i.e. for evry node we traverse in the order as dijkstra algorithm did
    //we change the color of node
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          for (
            let j = 0;
            j < shortestPath.length && shortestPath.length > 1;
            j++
          ) {
            let current = shortestPath[j];
            let terminalStartNode =
              document.getElementById(`r${current.row}c${current.column}`)
                .className === "node node-start node-visited";
            let terminalEndNode =
              document.getElementById(`r${current.row}c${current.column}`)
                .className === "node node-end node-visited";
            setTimeout(() => {
              if (terminalStartNode) {
                document.getElementById(
                  `r${current.row}c${current.column}`
                ).className = "node node-start node-shortestPath";
              } else if (terminalEndNode) {
                document.getElementById(
                  `r${current.row}c${current.column}`
                ).className = "node node-end node-shortestPath";
              } else
                document.getElementById(
                  `r${current.row}c${current.column}`
                ).className = "node node-shortestPath";
            }, 40 * j);
          }
        }, delay * i);
        setTimeout(() => {
          this.enableHalfHeader(shortestPath.length);
        }, delay * visitedNodesInOrder.length + 40 * shortestPath.length);
        return;
      }
      let current = visitedNodesInOrder[i];
      let terminalStartNode =
        document.getElementById(`r${current.row}c${current.column}`)
          .className === "node node-start";
      let terminalEndNode =
        document.getElementById(`r${current.row}c${current.column}`)
          .className === "node node-end";
      setTimeout(() => {
        if (terminalStartNode) {
          document.getElementById(
            `r${current.row}c${current.column}`
          ).className = "node node-start node-visited";
        } else if (terminalEndNode) {
          document.getElementById(
            `r${current.row}c${current.column}`
          ).className = "node node-end node-visited";
        } else
          document.getElementById(
            `r${current.row}c${current.column}`
          ).className = "node node-visited";
      }, delay * i);
    }
  }
  visualizeAstar() {
    let delay = this.state.speed;
    this.disableHeader();
    //Sixth, When button is pressed method is called
    //we get the list in return which has the order of visiting of nodes
    //IMPORTANT this is linear array/list
    let startnode = this.state.grid[START_NODE_ROW][START_NODE_COL];
    let endnode = this.state.grid[END_NODE_ROW][END_NODE_COL];
    let visitedNodesOrder = Astar(this.state.grid, startnode, endnode);
    let shortest_Path = tracePath(endnode);

    for (let i = 0; i <= visitedNodesOrder.length; i++) {
      if (i === visitedNodesOrder.length) {
        setTimeout(() => {
          for (
            let j = 0;
            j < shortest_Path.length && shortest_Path.length > 1;
            j++
          ) {
            let current = shortest_Path[j];
            let terminalStartNode =
              document.getElementById(`r${current.row}c${current.column}`)
                .className === "node node-start node-visited";
            let terminalEndNode =
              document.getElementById(`r${current.row}c${current.column}`)
                .className === "node node-end node-visited";
            setTimeout(() => {
              if (terminalStartNode) {
                document.getElementById(
                  `r${current.row}c${current.column}`
                ).className = "node node-start node-shortestPath";
              } else if (terminalEndNode) {
                document.getElementById(
                  `r${current.row}c${current.column}`
                ).className = "node node-end node-shortestPath ";
              } else
                document.getElementById(
                  `r${current.row}c${current.column}`
                ).className = "node node-shortestPath";
            }, 40 * j);
          }
        }, delay * i);
        setTimeout(() => {
          this.enableHalfHeader(shortest_Path.length);
        }, delay * visitedNodesOrder.length + 40 * shortest_Path.length);
        return;
      }
      let current = visitedNodesOrder[i];
      let terminalStartNode =
        document.getElementById(`r${current.row}c${current.column}`)
          .className === "node node-start";
      let terminalEndNode =
        document.getElementById(`r${current.row}c${current.column}`)
          .className === "node node-end";
      setTimeout(() => {
        if (terminalStartNode) {
          document.getElementById(
            `r${current.row}c${current.column}`
          ).className = "node node-start node-visited";
        } else if (terminalEndNode) {
          document.getElementById(
            `r${current.row}c${current.column}`
          ).className = "node node-end node-visited";
        } else
          document.getElementById(
            `r${current.row}c${current.column}`
          ).className = "node node-visited";
      }, delay * i);
    }
  }
  resetFullBoard() {
    this.componentDidMount();
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 75; j++) {
        if (i === START_NODE_ROW && j === START_NODE_COL) {
          document.getElementById(`r${i}c${j}`).className = "node node-start";
          continue;
        }
        if (i === END_NODE_ROW && j === END_NODE_COL) {
          document.getElementById(`r${i}c${j}`).className = "node node-end";
          continue;
        }
        document.getElementById(`r${i}c${j}`).className = "node ";
      }
    }
    this.enableFullHeader();
  }
  resetAlgorithm() {
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 75; j++) {
        let nonValidNode =
          document.getElementById(`r${i}c${j}`).className ===
            "node node-wall" ||
          document.getElementById(`r${i}c${j}`).className ===
            "node node-start" ||
          document.getElementById(`r${i}c${j}`).className === "node node-end";
        if (nonValidNode) {
          continue;
        }
        document.getElementById(`r${i}c${j}`).className = "node ";
      }
    }
  }
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  incSpeed() {
    let boxSpeed = document.getElementById("box");
    if (boxSpeed.innerHTML === "LOW") {
      this.setState({ speed: 20 }, () => (boxSpeed.innerHTML = "MEDIUM"));
    }
    if (boxSpeed.innerHTML === "MEDIUM") {
      this.setState({ speed: 5 }, () => (boxSpeed.innerHTML = "HIGH"));
    }
    if (boxSpeed.innerHTML === "HIGH") {
      this.setState({ speed: 40 }, () => (boxSpeed.innerHTML = "LOW"));
    }
  }
  decSpeed() {
    let boxSpeed = document.getElementById("box");
    if (boxSpeed.innerHTML === "LOW") {
      this.setState({ speed: 5 }, () => (boxSpeed.innerHTML = "HIGH"));
    }
    if (boxSpeed.innerHTML === "HIGH") {
      this.setState({ speed: 20 }, () => (boxSpeed.innerHTML = "MEDIUM"));
    }
    if (boxSpeed.innerHTML === "MEDIUM") {
      this.setState({ speed: 40 }, () => (boxSpeed.innerHTML = "LOW"));
    }
  }
  generateRandomWalls() {
    this.resetFullBoard();
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 75; j++) {
        if (i === START_NODE_ROW && j === START_NODE_COL) {
          continue;
        }
        if (i === END_NODE_ROW && j === END_NODE_COL) {
          continue;
        }
        let wallProbability = Math.random();
        if (wallProbability > 0.7) {
          document.getElementById(`r${i}c${j}`).className = "node node-wall";
        }
      }
    }
    this.handleMouseUp(0, 0);
  }
  render() {
    //Second Render Method is called which draws the  button and entire grid containing 1000 cells
    return (
      <div id="pathfinding-visualizer" className="componentOpener">
        <div id="header" className="active-content">
          <button id="hbtn1" onClick={() => this.visualizeDijkstra()}>
            DIJKSTRA's ALGORITHM
          </button>
          <button id="hbtn2" onClick={() => this.visualizeAstar()}>
            A STAR (A*) ALGORITHM
          </button>
          <button id="hbtn3" onClick={() => this.generateRandomWalls()}>
            GENERATE RANDOM WALLS
          </button>
          <button id="hbtn4" onClick={() => this.resetFullBoard()}>
            RESET GRID
          </button>
          <div id="pf-speed-container">
            SPEED:
            <div id="prev-container" onClick={() => this.decSpeed()}>
              <span id="prev"></span>
            </div>
            <span id="box">HIGH</span>
            <div id="next-container" onClick={() => this.incSpeed()}>
              <span id="next"></span>
            </div>
          </div>
        </div>
        <Grid
          snr={START_NODE_ROW}
          snc={START_NODE_COL}
          enr={END_NODE_ROW}
          enc={END_NODE_COL}
          grid1={this.state.grid}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
        ></Grid>
        <div id="path-count">SHORTEST PATH - INFINITE UNITS</div>
        <div id="title-base">
          <span>PATHFINDING VISUALIZER</span>
          <hr></hr>
          <button id="path-to-sort-switcher" onClick={switchToSorter}>
            Switch to Sorting Visualizer
          </button>
        </div>
      </div>
    );
  }
}
function switchToSorter() {
  Selection.path_to_sort();
}
//Fourth, getInitialgrid method returns the crucial information that is used in dijkstra algorithm
//i.e. the structure of the node

function getInitialGrid() {
  let list = [];
  for (let i = 0; i < 30; i++) {
    let row = [];
    for (let j = 0; j < 75; j++) {
      row.push({
        row: i,
        column: j,
        isStart: i === START_NODE_ROW && j === START_NODE_COL,
        isFinish: i === END_NODE_ROW && j === END_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
        gCost: 0,
        hCost: 0,
        fCost: 0,
      });
    }
    list.push(row);
  }
  return list;
}
function explicitWallGrid(thisGrid) {
  const temporaryGrid = thisGrid.slice();
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 75; j++) {
      if (i === START_NODE_ROW && j === START_NODE_COL) {
        continue;
      }
      if (i === END_NODE_ROW && j === END_NODE_COL) {
        continue;
      }
      let nodeClass = document.getElementById(`r${i}c${j}`).className;
      const node = thisGrid[i][j];
      if (nodeClass === "node node-wall") {
        const newnode = { ...node, isWall: true };
        temporaryGrid[i][j] = newnode;
      }
      if (nodeClass === "node ") {
        const newnode = { ...node, isWall: false };
        temporaryGrid[i][j] = newnode;
      }
    }
  }
  return temporaryGrid;
}

export default PathfindingVisualizer;
