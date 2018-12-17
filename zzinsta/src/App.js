import React, { Component } from 'react';
import logo from './pics/settings.png';
import './App.css';
import Compo2 from './components/Compo2.jsx';
import Login from './components/Login.jsx';
import StuffColomn from "./components/StuffColomn";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
      <Compo2/>
      <Login />
        </header>
        <StuffColomn />
      </div>
    );
  }
}

export default App;
