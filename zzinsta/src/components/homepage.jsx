import React, { Component } from 'react';
import '../css/album.css'
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
            <header>
                <div class="navbar navbar-dark bg-dark shadow-sm">
                    <div class="container d-flex justify-content-between">
                    <a href="#" class="navbar-brand d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                        <strong>Album</strong>
                    </a>
                    <button class="navbar-toggler" >
                        <Login setConnect={this.setConnect} />
                    </button>
                    </div>
                </div>
                </header>

                <main role="main">

                <section class="jumbotron text-center">
                    <div class="container">
                    <h1 class="jumbotron-heading">Album example</h1>
                    <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
                    <p>
                        <a href="#" class="btn btn-primary my-2">Main call to action</a>
                        <a href="#" class="btn btn-secondary my-2">Secondary action</a>
                    </p>
                    </div>
                </section>

                <StuffColomn />

                </main>

                <footer class="text-muted">
                <div class="container">
                    <p class="float-right">
                    <a href="#">Revenir au début</a>
                    </p>
                    <p>Wow, qu'il est bien ce site!</p>
                </div>
                </footer>

            
        </div>
        );
    else 
        return (
            <Login setConnect={this.setConnect}/>
            );
  }
}

export default Homepage;
