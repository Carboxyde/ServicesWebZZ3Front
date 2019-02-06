import React, { Component } from 'react';
import '../css/signin.css'
import logo from '../pics/settings.png';
import PropTypes from 'prop-types';
import axios from 'axios'

export default class LoginInput extends React.Component {

    static propTypes = {
        setConnect: PropTypes.func
    }


    constructor(props){
        super(props);
        this.state =  {
            login:'',
            pwd:'',
            connect:localStorage.getItem("token")!=null,
            error:'',
            file:''
        };
        this.handleClick = this.handleClick.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.disconnect = this.disconnect.bind(this);

    }
    
    changeLogin(event){
        let val = event.target.value
        this.setState(state => ({
            login: val
        }));
    }
    changePassword(event){
        let val = event.target.value
        this.setState({
            pwd: val
        });
    }
    async handleClick(event){
        event.preventDefault();
        if (await this.checkPassword(this.state.login, this.state.pwd)){
            this.setState({
                connect:true,
                error:null
            });            
            this.props.setConnect(true)
        }
        else
            this.setState({
                error:"Votre identifiant ou mot de passe est incorrect"
            });
    }

    async disconnect(event){
        localStorage.removeItem("token");
        this.setState({
            connect:false
        });
        this.props.setConnect(false);
    }

    async checkPassword(login, pwd){
        let result=false;

        try {
            let res = await axios.post("http://localhost:5000/login", {
                "mail": login,
                "password": pwd
            });
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("Username", login);

            if (res.data.success){
                result = true
            }

          } catch (err) {
            console.error(err);
          }

        return result;
    }

    render() {
        if (!this.state.connect)
            return  <form class="form-signin">
                        <img src={logo} className="App-logo" width="100%" alt="logo" />
                        <h1 class="h3 mb-3 font-weight-normal">Veuillez vous connecter</h1>
                        <label for="inputEmail" class="sr-only">Adresse mail</label>
                        <input onChange={this.changeLogin} type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
                        <label for="inputPassword" class="sr-only">Mot de passe</label>
                        <input onChange={this.changePassword} type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
                        <div class="alert alert-danger" hidden={this.state.error==""}>
                            {this.state.error}
                        </div>
                        <button onClick={this.handleClick} class="btn btn-lg btn-primary btn-block" >Se connecter</button>
                    </form>; 
        else
            return <div> 
            <p>{this.state.login}</p>
            <p>Vous êtes connecté</p>
            <button class="btn" onClick={this.disconnect}>Se déconnecter</button>
            </div>
        
    }
}
