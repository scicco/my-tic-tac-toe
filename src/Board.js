import React, { Component } from 'react';

function Square(props) {
  let value = props.value;
  if (value === null) {
    value = '\x00';
  }
  return (
    <button className={'square ' + props.color} onClick={props.onClick}>
      {value}
    </button>
  );
}

export default class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        color={this.props.squaresColor[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
       <div>
         <div className="board-row">
           {this.renderSquare(0)}
           {this.renderSquare(1)}
           {this.renderSquare(2)}
         </div>
         <div className="board-row">
           {this.renderSquare(3)}
           {this.renderSquare(4)}
           {this.renderSquare(5)}
         </div>
         <div className="board-row">
           {this.renderSquare(6)}
           {this.renderSquare(7)}
           {this.renderSquare(8)}
         </div>
       </div>
     )
   }
 }
