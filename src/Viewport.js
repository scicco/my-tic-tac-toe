import React, { Component } from 'react';
import Board from './Board.js'

function Title(props) {
  return (
    <h3 className="title">
      {props.text}
    </h3>
  );
}

class Viewport extends Component {
  renderTitle(message) {
    return (
      <Title text={message}/>
    );
  }

  constructor(props) {
    super(props);

    const emptyArray = new Array(9)
    for(let i = 0; i < 9; i++) {
      emptyArray[i] = null;
    }
    const defaultColorArray = new Array(9)
    for(let i = 0; i < 9; i++) {
      defaultColorArray[i] = 'black';
    }
    this.state = {
      turnOf: 'x',
      message: this.refreshMessage('x'),
      squares: emptyArray,
      squaresColor: defaultColorArray
    }
  }

  onBoardClickHandler(buttonIndex) {
    //console.log('click');
    const clonedSquares = this.state.squares.map(x=>x);
    let anybodyWin = this.hasSomeoneMadeTris();
    if (this.movesFinished() && window.confirm("Press yes to restart")){
          window.location.reload();
    }
    if (anybodyWin && window.confirm("Press yes to restart")){
      window.location.reload();
      return;
    }
    if (!anybodyWin && clonedSquares[buttonIndex] === null) {
      clonedSquares[buttonIndex] = this.state.turnOf;
      //console.log(this.state.turnOf);
      this.setState({squares: clonedSquares, turnOf: this.state.turnOf === 'x' ? 'o' : 'x'});
    } else {
      return;
    }
  }

  nextTurn(current) {
    if (current === undefined) {
      return 'x';
    }
    return current === 'x' ? 'o' : 'x'
  }

  availableTrisSquares() {
    let availableTrisSquares = [];
    //horizontal rows
    availableTrisSquares.push([0,1,2]);
    availableTrisSquares.push([3,4,5]);
    availableTrisSquares.push([6,7,8]);
    //vertical rows
    availableTrisSquares.push([0,3,6]);
    availableTrisSquares.push([1,4,7]);
    availableTrisSquares.push([2,5,8]);
    //cross rows
    availableTrisSquares.push([0,4,8]);
    availableTrisSquares.push([2,4,6]);
    return availableTrisSquares;
  }

  winnerSquares() {
    let availableTrisSquares = this.availableTrisSquares();
    for(let group in availableTrisSquares) {
      let indexes = availableTrisSquares[group];
      let first = indexes[0];
      if (this.state.squares[first] == null) {
        continue;
      }
      let second = indexes[1];
      let third = indexes[2];
      if (this.state.squares[first] === this.state.squares[second] && this.state.squares[second] === this.state.squares[third]) {
        console.log(this.state.squares[first] + ' has won!')
        return [first, second, third];
      }
    }
    return [];
  }

  hasSomeoneMadeTris() {
    if (this.winnerSquares().length === 0) {
      return false;
    } else {
      return true;
    }
  }

  movesFinished() {
    let found = true;
    for(let i = 0; i < 9; i++) {
      if (this.state.squares[i] === null) {
        found = false;
        break;
      }
    }
    return found;
  }

  colorWinnerSquares() {
    let winnerSquares = this.winnerSquares();
    if (winnerSquares.length > 0) {
      let squaresColorCopy = new Array(9)
      for(let i = 0; i < 9; i++) {
        squaresColorCopy[i] = this.state.squaresColor[i];
      }
      squaresColorCopy[winnerSquares[0]] = 'winner'
      squaresColorCopy[winnerSquares[1]] = 'winner'
      squaresColorCopy[winnerSquares[2]] = 'winner'
      this.setState({squaresColor: squaresColorCopy});
    }
  }

  refreshMessage(currentTurn) {
    return "Player " + this.nextTurn(currentTurn).toUpperCase() + " turn";
  }

  render() {
    let winnerSquares = this.winnerSquares();
    const squaresColorCopy = this.state.squaresColor.map(x=>x);
    if (winnerSquares.length > 0) {
      squaresColorCopy[winnerSquares[0]] = 'winner'
      squaresColorCopy[winnerSquares[1]] = 'winner'
      squaresColorCopy[winnerSquares[2]] = 'winner'
    }
    let message;
    message = "Player " + this.state.turnOf + " turn";
    if (this.hasSomeoneMadeTris()) {
      message = "Player "+ this.nextTurn(this.state.turnOf) + " win!";
    }
    if (this.movesFinished()){
      message = "Click again on square to restart";
    }
    return (
      <div className="viewport">
        {this.renderTitle(message)}
        <Board turnOf={this.state.turnOf}
          squares={this.state.squares}
          squaresColor={squaresColorCopy}
          onClick={i => this.onBoardClickHandler(i)} />
      </div>
    );
  }
}
export default Viewport;
