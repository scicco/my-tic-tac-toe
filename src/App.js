import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Viewport from './Viewport.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.baseState = this.state;
  }

  resetApp = () => {
    this.setState(this.baseState);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My Tic Tac Toe</h1>
        </header>
        <Viewport/>
      </div>
    );
  }
}
