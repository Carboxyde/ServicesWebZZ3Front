import React, { Component } from 'react';
import './App.css';
import logo from './pics/settings.png';
import Homepage from "./components/homepage";

require('dotenv').config({ path: '/conf/.env' });

class App extends Component {
  render() {
    return (
      <Homepage />
    );
  }
}

export default App;
