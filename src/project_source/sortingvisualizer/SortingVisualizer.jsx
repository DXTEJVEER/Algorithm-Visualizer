import React, { Component } from "react";
import "./styles.css";
import * as SortingAlgorithms from "./SortingAlgorithms";
import * as Selection from "../SelectScreen";

export class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.getrandomvariable = this.getrandomvariable.bind(this);
    this.arraySizeChange = this.arraySizeChange.bind(this);
    this.animationSpeedChange = this.animationSpeedChange.bind(this);
    this.restoreButtonFunctionality = this.restoreButtonFunctionality.bind(
      this
    );

    this.state = {
      baseArray: [],
      bars: 150,
      delay: 1,
      status: 0,
    };
  }
  componentDidMount() {
    this.resetBaseArray();
    document.getElementById("stop-button").disabled = true;
  }
  //this function creates arrays
  resetBaseArray() {
    const newarray = [];
    for (let i = 0; i < this.state.bars; i++) {
      newarray.push(this.getrandomvariable(5, 100));
    }
    this.setState({ baseArray: newarray });
  }
  //this gives random variable
  getrandomvariable(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //calls mergesort
  disablebuttons() {
    document.getElementById("head-section").className = "disabled";
    document.getElementById("btn1").disabled = true;
    document.getElementById("btn2").disabled = true;
    document.getElementById("btn3").disabled = true;
    document.getElementById("btn4").disabled = true;
    document.getElementById("btn5").disabled = true;
    document.getElementById("btn6").disabled = true;
    document.getElementById("slider").disabled = true;
    document.getElementById("speed-slider").disabled = true;
    document.getElementById("stop-button").disabled = false;
    document.getElementById("stop-button").style.backgroundColor =
      "rgb(177, 58, 58)";
  }
  restoreButtonFunctionality() {
    document.getElementById("head-section").className = "active";
    document.getElementById("btn1").disabled = false;
    document.getElementById("btn2").disabled = false;
    document.getElementById("btn3").disabled = false;
    document.getElementById("btn4").disabled = false;
    document.getElementById("btn5").disabled = false;
    document.getElementById("btn6").disabled = false;
    document.getElementById("slider").disabled = false;
    document.getElementById("speed-slider").disabled = false;
    document.getElementById("stop-button").disabled = true;
    document.getElementById("stop-button").backgroundColor = "gray";
  }
  stopCurrentAlgo() {
    var id = window.setTimeout(function () {}, 0);
    while (id--) {
      window.clearTimeout(id);
    }
    this.restoreButtonFunctionality();
    this.resetter();
    const elements = document.getElementsByClassName("bar");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = " rgb(36, 182, 255)";
    }
  }
  sortViaMergesort() {
    this.disablebuttons();
    const delay = this.state.delay;
    const barray = SortingAlgorithms.mergesort(this.state.baseArray);
    for (let i = 0; i < barray.length; i++) {
      const bar = document.getElementsByClassName("bar");
      const colorChange = i % 3 !== 2;
      if (colorChange) {
        const [first, second] = barray[i];
        const firstStyle = bar[first].style;
        const secondStyle = bar[second].style;
        const color = i % 3 === 0 ? "red" : "rgb(36, 182, 255)";
        setTimeout(() => {
          firstStyle.backgroundColor = color;
          secondStyle.backgroundColor = color;
        }, i * delay);
      } else {
        setTimeout(() => {
          const [idx, ht] = barray[i];
          const idxStyle = bar[idx].style;
          // idxStyle.backgroundColor = "purple ";
          idxStyle.height = `${ht * 0.7}vh`;
        }, i * delay);
      }
    }
    setTimeout(() => {
      this.restoreButtonFunctionality();
    }, delay * (barray.length - 1));
  }

  //call quicksort
  sortViaQuicksort() {
    this.disablebuttons();
    const delay = this.state.delay;
    const temp = SortingAlgorithms.quicksort(this.state.baseArray);
    const quicksteps = temp[0];

    for (let i = 0; i < quicksteps.length; i++) {
      const bar = document.getElementsByClassName("bar");
      const colorChange = i % 3 !== 2;

      if (colorChange) {
        const [first, second] = quicksteps[i];
        const firstStyle = bar[first].style;
        const secondStyle = bar[second].style;
        const color = i % 3 === 0 ? "red" : "rgb(36, 182, 255)";
        setTimeout(() => {
          firstStyle.backgroundColor = color;
          secondStyle.backgroundColor = color;
        }, i * delay);
      } else {
        setTimeout(() => {
          const [ida, idb] = quicksteps[i];
          const idaStyle = bar[ida].style;
          const idbStyle = bar[idb].style;
          let height = idaStyle.height;
          idaStyle.height = idbStyle.height;
          idbStyle.height = height;
        }, i * delay);
      }
    }
    setTimeout(() => {
      this.restoreButtonFunctionality();
    }, delay * (quicksteps.length - 1));
  }
  sortViaBubblesort() {
    this.disablebuttons();
    const temp = SortingAlgorithms.bubblesort(this.state.baseArray);
    const delay = this.state.delay;
    const bubblesteps = temp[1];

    for (let i = 0; i < bubblesteps.length; i++) {
      const bar = document.getElementsByClassName("bar");
      const colorChange = i % 3 !== 2;

      if (colorChange) {
        const [first, second] = bubblesteps[i];
        const firstStyle = bar[first].style;
        const secondStyle = bar[second].style;
        const color = i % 3 === 0 ? "red" : "rgb(36, 182, 255)";
        setTimeout(() => {
          firstStyle.backgroundColor = color;
          secondStyle.backgroundColor = color;
        }, i * delay);
      } else {
        setTimeout(() => {
          const [ida, idb] = bubblesteps[i];
          const idaStyle = bar[ida].style;
          const idbStyle = bar[idb].style;
          let height = idaStyle.height;
          idaStyle.height = idbStyle.height;
          idbStyle.height = height;
        }, i * delay);
      }
    }
    setTimeout(() => {
      this.restoreButtonFunctionality();
    }, delay * (bubblesteps.length - 1));
  }
  sortViaInsertionsort() {
    this.disablebuttons();

    const temp = SortingAlgorithms.insertionsort(this.state.baseArray);
    const delay = this.state.delay;
    const insertionsteps = temp[1];
    for (let i = 0; i < insertionsteps.length; i++) {
      const bar = document.getElementsByClassName("bar");
      const colorChange = i % 3 !== 2;

      if (colorChange) {
        const [first, second] = insertionsteps[i];
        const firstStyle = bar[first].style;
        const secondStyle = bar[second].style;
        const color = i % 3 === 0 ? "red" : "rgb(36, 182, 255)";
        setTimeout(() => {
          firstStyle.backgroundColor = color;
          secondStyle.backgroundColor = color;
        }, i * delay);
      } else {
        setTimeout(() => {
          const [ida, height] = insertionsteps[i];
          const idaStyle = bar[ida].style;
          idaStyle.height = `${height * 0.7}vh`;
        }, i * delay);
      }
    }
    setTimeout(() => {
      this.restoreButtonFunctionality();
    }, delay * (insertionsteps.length - 1));
  }
  sortViaSelectionsort() {
    this.disablebuttons();
    // this.setState({ status: 1 }, disableheader);
    const delay = this.state.delay;
    const temp = SortingAlgorithms.selectionsort(this.state.baseArray);
    const selectionsteps = temp[1];
    for (let i = 0; i < selectionsteps.length; i++) {
      const bar = document.getElementsByClassName("bar");
      const colorChange = i % 3 !== 2;

      if (colorChange) {
        const [first, second] = selectionsteps[i];
        const firstStyle = bar[first].style;
        const secondStyle = bar[second].style;
        const color = i % 3 === 0 ? "red" : "rgb(36, 182, 255)";
        setTimeout(() => {
          firstStyle.backgroundColor = color;
          secondStyle.backgroundColor = color;
        }, i * delay);
      } else {
        setTimeout(() => {
          const [ida, idb] = selectionsteps[i];
          const idaStyle = bar[ida].style;
          const idbStyle = bar[idb].style;
          const newHeight = idaStyle.height;
          idaStyle.height = idbStyle.height;
          idbStyle.height = newHeight;
        }, i * delay);
      }
    }
    setTimeout(() => {
      this.restoreButtonFunctionality();
    }, delay * (selectionsteps.length - 1));
  }

  resetter() {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        this.resetBaseArray();
      }, 30 * i);
    }
  }
  arraySizeChange() {
    let newNumberOfBars = document.getElementById("slider").value;
    this.setState({ bars: newNumberOfBars }, this.resetBaseArray);
  }
  animationSpeedChange() {
    let newAnimationSpeed = document.getElementById("speed-slider").value;
    this.setState({ delay: 1000 - newAnimationSpeed + 1 });
  }
  render() {
    const array = this.state.baseArray;
    return (
      <div id="sorting-visualizer" className="componentOpener">
        <div id="head-section" className="active">
          <div id="slider-container">
            Array Size:
            <input
              type="range"
              name=""
              min="5"
              step="1"
              defaultValue="150"
              max="300"
              id="slider"
              onChange={this.arraySizeChange}
            ></input>
          </div>
          <button
            id="btn1"
            className="head-section-button"
            onClick={() => {
              this.resetter();
            }}
          >
            Generate new array
          </button>
          <button
            id="btn2"
            className="head-section-button"
            onClick={() => {
              this.sortViaMergesort();
            }}
          >
            Merge Sort!
          </button>
          <button
            id="btn3"
            className="head-section-button"
            onClick={() => {
              this.sortViaQuicksort();
            }}
          >
            Quick Sort!
          </button>
          <button
            id="btn4"
            className="head-section-button"
            onClick={() => {
              this.sortViaBubblesort();
            }}
          >
            Bubble Sort!
          </button>
          <button
            id="btn5"
            className="head-section-button"
            onClick={() => {
              this.sortViaInsertionsort();
            }}
          >
            Insertion Sort!
          </button>
          <button
            id="btn6"
            className="head-section-button"
            onClick={() => {
              this.sortViaSelectionsort();
            }}
          >
            Selection Sort!
          </button>
          <div id="speed-slider-container">
            Speed:
            <input
              type="range"
              min="1"
              step="1"
              defaultValue="1000"
              max="1000"
              id="speed-slider"
              onChange={this.animationSpeedChange}
            ></input>
          </div>
        </div>

        <div className="container">
          {array.map((value, idx) => (
            <div
              className="bar"
              key={idx}
              id={`${idx}`}
              style={{ height: `${value * 0.7}vh` }}
            ></div>
          ))}
        </div>
        <div id="stop-div">
          <button
            id="stop-button"
            onClick={() => {
              this.stopCurrentAlgo();
            }}
          >
            STOP!
          </button>
        </div>
        <div className="bottom-base">
          <span>SORTING VISUALIZER</span>
          <hr></hr>
          <button id="switcher" onClick={switchToPathfinder}>
            Switch to Pathfinding Visualizer
          </button>
        </div>
      </div>
    );
  }
}
function switchToPathfinder() {
  Selection.sort_to_path();
}
export default SortingVisualizer;
