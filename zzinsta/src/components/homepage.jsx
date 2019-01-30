import React, { Component } from 'react';
import logo from '../pics/settings.png';
import Compo2 from './Compo2.jsx';
import Login from './Login.jsx';
import StuffColomn from "./StuffColomn";


class Homepage extends Component {
    constructor(props){
      super(props);
      const access_token = localStorage.getItem("token");
      const isConnected = access_token!=null
      this.state = {
        connected:isConnected
      }
      this.setConnect=this.setConnect.bind(this)
    }

    setConnect(isConnected) {
        this.setState({
            connected: isConnected
        });
    }


  render() {
    const access_token = localStorage.getItem("token");
    if (access_token!=null)
        return (
        <div className="Homepage">
        <Login setConnect={this.setConnect} />
            <StuffColomn />
        </div>
        );
    else 
        return (
        <div className="Homepage">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        <Compo2/>
        <Login setConnect={this.setConnect}/>
            </header>
        </div>
        );
  }
}

export default Homepage;
