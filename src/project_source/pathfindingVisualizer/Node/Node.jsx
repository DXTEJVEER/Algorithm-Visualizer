import React, { PureComponent } from "react";
import "./Node.css";
//The individual Grid element is actually this Component
class Node extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { props };
  }

  render() {
    //extraClassName as the name implies is the extra class which is assigned to a Node Component (to be specific the '<div>' html tag)
    //this helps to distinguish the reghular node from startnode and finnish node and wall
    let extraClassName = this.props.isStart
      ? "node-start"
      : this.props.isEnd
      ? "node-end"
      : this.props.isWall
      ? "node-wall"
      : "";
    return (
      //node component is actually a <div> tag with an id and classes
      <div
        id={`r${this.props.row}c${this.props.column}`}
        className={`node ${extraClassName}`}
        onMouseDown={() =>
          this.props.onMouseDown1(this.props.row, this.props.column)
        }
        onMouseEnter={() =>
          this.props.onMouseEnter1(this.props.row, this.props.column)
        }
        onMouseUp={() =>
          this.props.onMouseUp1(this.props.row, this.props.column)
        }
        onMouseLeave={() =>
          this.props.onMouseLeave1(this.props.row, this.props.column)
        }
        //github.com/react-dnd/react-dnd/issues/900
        //solves drag issue
        onDragStart={(e) => e.preventDefault()}
      ></div>
    );
  }
}

export default Node;
