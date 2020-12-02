import React from "react";
import "./App.css";
import LoadingTestComponent from "./project_source/LoadingTestComponent";
import PathfindingVisualizer from "./project_source/pathfindingVisualizer/PathfindingVisualizer";
import SelectScreen from "./project_source/SelectScreen";
import SortingVisualizer from "./project_source/sortingvisualizer/SortingVisualizer";
function shifterfunction() {
  let ele = document.getElementById("selectscreen");
  document.getElementById("loadingText").style.display = "none";
  ele.style.display = "flex";
}
function App() {
  setTimeout(() => {
    shifterfunction();
  }, 4000);

  return (
    <div>
      <LoadingTestComponent />
      <SelectScreen></SelectScreen>
      <PathfindingVisualizer></PathfindingVisualizer>
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
