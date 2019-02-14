import React, { Component } from 'react';
import '../css/album.css'
import Login from './Login.jsx';
import StuffColomn from "./StuffColomn";
import PostCreator from "./PostCreator";


class Homepage extends Component {
    constructor(props){
      super(props);
      const access_token = localStorage.getItem("token");
      const isConnected = access_token!=null
      this.state = {
        connected:isConnected,
        mode:'global',
      }
      this.setConnect=this.setConnect.bind(this);
      this.GlobalMode=this.GlobalMode.bind(this);
      this.PersonalMode=this.PersonalMode.bind(this);
    }

    setConnect(isConnected) {
        this.setState({
            connected: isConnected
        });
    }

    GlobalMode(){
        this.setState({
            mode: 'global',
        });
    }

    PersonalMode(){
        this.setState({
            mode: 'personal',
        });
    }

  render() {
    const access_token = localStorage.getItem("token");
    const userId = localStorage.getItem("UserId");
    if (access_token!=null)
        return (
        <div className="Homepage">
            <header>
                <div class="navbar navbar-dark bg-dark shadow-sm">
                    <div class="container d-flex justify-content-between">
                    <a href="#" class="navbar-brand d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                        <h1>InstaZZ</h1>
                    </a>
                    <div class="navbar-toggler" >
                        <Login setConnect={this.setConnect} />
                    </div>
                    </div>
                </div>
                </header>

                <main role="main">

                <section class="jumbotron col-md-12 text-center">
                    <PostCreator updateMethod={this.GlobalMode.bind(this)}/>
                </section>

                    <nav class="nav nav-pills nav-justified">
                        <a class={'nav-item nav-link'+(this.state.mode=='global'?' active':'')} onClick={this.GlobalMode}>Fil commun</a>
                        <a class={'nav-item nav-link'+(this.state.mode=='personal'?' active':'')} onClick={this.PersonalMode}>Votre fil</a>
                    </nav>
                <StuffColomn UserId={this.state.mode=='personal'?userId:null}/>
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
