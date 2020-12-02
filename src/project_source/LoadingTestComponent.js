import React, { Component } from "react";

export class LoadingTestComponent extends Component {
  render() {
    return (
      <div>
        <div id="loadingText">
          <ul id="loadingUL">
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </ul>
        </div>
      </div>
    );
  }
}

export default LoadingTestComponent;
