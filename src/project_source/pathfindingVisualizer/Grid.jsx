import React from "react";
import { PureComponent } from "react";
import Node from "./Node/Node";
//The Grid Component is Responsible for rendering the grid
//Those 1000 cells are actually individual components being created by this component
class Grid extends PureComponent {
  //First we create a nested list with a structure of cells inside rows in side list
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let list = this.props.grid1;
    //Secondly we use the 'list' to create 'list2' that contains jsx components as elements
    //we use the 'map' function to create 'list2'
    //map funcrtion returns a new element/component by receiving an element and processing it.
    //Here we create *Node* component for every element in list
    let list2 = list.map((row) =>
      row.map((cell) => (
        //Node component has following properties
        <Node
          key={`${cell.row}${cell.column}`}
          row={cell.row}
          column={cell.column}
          isStart={
            cell.row === this.props.snr && cell.column === this.props.snc
          }
          isEnd={cell.row === this.props.enr && cell.column === this.props.enc}
          isWall={cell.isWall}
          onMouseDown1={this.props.onMouseDown}
          onMouseEnter1={this.props.onMouseEnter}
          onMouseUp1={this.props.onMouseUp}
          onMouseLeave1={this.props.onMouseLeave}
        ></Node>
      ))
    );
    //Third, Finally we return a list of *Node* components
    return (
      <div
        id="upper-board-layer"
        onMouseLeave={() => {
          this.props.onMouseUp(0, 0);
        }}
      >
        <div className="board">{list2}</div>
      </div>
    );
  }
}

export default Grid;
