import React from "react";

function SelectScreen() {
  return (
    <div id="selectscreen">
      <div id="pathfinding-sec" onClick={pathFindingOpener}>
        PATHFINDING VISUALIZATION
      </div>
      <div id="sorting-sec" onClick={sortingOpener}>
        SORTING VISUALIZATION
      </div>
    </div>
  );
}
//Following functions are responsible for switching of different Components

function pathFindingOpener() {
  document.getElementById("pathfinding-sec").className = "SelectScreen_to_comp";
  document.getElementById("sorting-sec").textContent = "";
  setTimeout(() => {
    pathFindingOpenerFunction();
  }, 1000);
}
function pathFindingOpenerFunction() {
  document.getElementById("selectscreen").style.display = "none";
  document.getElementById("sorting-visualizer").style.display = "none";
  document.getElementById("pathfinding-visualizer").style.display = "flex";
}

function sortingOpener() {
  document.getElementById("sorting-sec").className = "SelectScreen_to_comp";
  document.getElementById("pathfinding-sec").textContent = "";
  setTimeout(() => {
    sortingOpenerFunction();
  }, 1000);
}
function sortingOpenerFunction() {
  document.getElementById("selectscreen").style.display = "none";
  document.getElementById("sorting-visualizer").style.display = "flex";
  document.getElementById("pathfinding-visualizer").style.display = "none";
}

//Following function called by Pathfinding and sorting Components
export function sort_to_path() {
  document.getElementById("sorting-visualizer").className = "componentCloser";
  setTimeout(() => {
    document.getElementById("sorting-visualizer").style.display = "none";
    document.getElementById("sorting-visualizer").className = "componentOpener";
    document.getElementById("pathfinding-visualizer").style.display = "flex";
    document.getElementById("pathfinding-visualizer").className =
      "componentOpener";
  }, 1000);
}
export function path_to_sort() {
  document.getElementById("pathfinding-visualizer").className =
    "componentCloser";
  setTimeout(() => {
    document.getElementById("pathfinding-visualizer").style.display = "none";
    document.getElementById("pathfinding-visualizer").className =
      "componentOpener";
    document.getElementById("sorting-visualizer").style.display = "flex";
    document.getElementById("sorting-visualizer").className = "componentOpener";
  }, 1000);
}
export default SelectScreen;
