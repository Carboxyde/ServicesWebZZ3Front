import React, { Component } from 'react';
import '../css/signin.css'
import logo from '../pics/settings.png';
import PropTypes from 'prop-types';
import UserService from './UserService'

export default class LoginInput extends React.Component {

    static propTypes = {
        setConnect: PropTypes.func
    }


    constructor(props){
        super(props);
        this.state =  {
            mode:localStorage.getItem("token")==null ? 'login' : 'connected',
            login:'',
            username:'',
            pwd:'',
            pwdBis:'',
            error:'',
            file:''
        };
        this.clickLogin = this.clickLogin.bind(this);
        this.clickRegister = this.clickRegister.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePasswordBis = this.changePasswordBis.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.signUp = this.signUp.bind(this);

    }
    
    changeLogin(event){
        let val = event.target.value
        this.setState(state => ({
            login: val
        }));
    }
    changeUsername(event){
        let val = event.target.value
        this.setState(state => ({
            username: val
        }));
    }
    changePassword(event){
        let val = event.target.value
        this.setState({
            pwd: val
        });
    }
    changePasswordBis(event){
        let val = event.target.value
        this.setState({
            pwdBis: val
        });
    }
    async clickLogin(event){
        event.preventDefault();
        let res = await UserService.loginUser(this.state.login, this.state.pwd)
        if (res.token!=null){
            localStorage.setItem("token", res.token);
            localStorage.setItem("Username", res.username); // TODO change to res username
            localStorage.setItem("UserId", res.userId);
            this.setState({
                mode:'connected',
                error:null
            });            
            this.props.setConnect(true)
        }
        else
            this.setState({
                error:"Votre identifiant ou mot de passe est incorrect"
            });
    }
    
    async clickRegister(event){
        event.preventDefault();
        if (this.state.login!='' && this.state.pwd!='' && this.state.pwd==this.state.pwdBis && this.state.username!=''){
                let res = await UserService.registerUser(this.state.login, this.state.pwd, this.state.username);
                console.log(res)
                if (res==true){
                    this.setState({
                        mode:'login',
                        error:''
                    });
                }
                else {
                    this.setState({
                        error:res
                    });
                }         
        }
        else
            this.setState({
                error:"Veuillez mieux renseigner les champs"
            });
    }

    signUp(event){
        this.setState(state => ({
            mode: 'signup'
        }));
    }
    async disconnect(event){
        localStorage.removeItem("token");
        this.setState({
            mode:'login'
        });
        this.props.setConnect(false);
    }


    render() {
        var errorStyle = {
            display : this.state.error==''?'none':'block'
          };
        if (this.state.mode=='signup')
            return <form class="form-signin">
                <img src={logo} className="App-logo" width="100%" alt="logo" />
                <h1 class="h3 mb-3 font-weight-normal">Veuillez vous inscrire</h1>
                <label for="inputEmail" class="sr-only">Adresse mail</label>
                <input onChange={this.changeLogin} type="email" id="inputEmail" class="form-control" placeholder="Adresse mail" required autofocus/>
                <label for="inputUsername" class="sr-only">Nom d'utilisateur</label>
                <input onChange={this.changeUsername} type="email" id="inputUsername" class="form-control" placeholder="Nom d'utilisateur" required/>
                <label for="inputPassword" class="sr-only">Mot de passe</label>
                <input onChange={this.changePassword} type="password" id="inputPassword" class="form-control" placeholder="Mot de passe" required/>
                <label for="inputPasswordBis" class="sr-only">Confirmation du mot de passe</label>
                <input onChange={this.changePasswordBis} type="password" id="inputPasswordBis" class="form-control" placeholder="Confirmation du mot de passe" required/>
                <div class="alert alert-danger" style={errorStyle}>
                    {this.state.error}
                </div>
                <button onClick={this.clickRegister} class="btn btn-lg btn-primary btn-block" >S'inscrire</button>
            </form>;
        else 
        if (this.state.mode=='login')
            return  <form class="form-signin">
                        <img src={logo} className="App-logo" width="100%" alt="logo" />
                        <h1 class="h3 mb-3 font-weight-normal">Veuillez vous connecter</h1>
                        <p class="h6 text-muted">ou vous <u onClick={this.signUp}>inscrire</u></p>
                        <label for="inputEmail" class="sr-only">Adresse mail</label>
                        <input onChange={this.changeLogin} type="email" id="inputEmail" class="form-control" placeholder="Adresse mail" required autofocus/>
                        <label for="inputPassword" class="sr-only">Mot de passe</label>
                        <input onChange={this.changePassword} type="password" id="inputPassword" class="form-control" placeholder="Mot de passe" required/>
                        <div class="alert alert-danger" style={errorStyle}>
                            {this.state.error}
                        </div>
                        <button onClick={this.clickLogin} class="btn btn-lg btn-primary btn-block" >Se connecter</button>
                    </form>; 
        else
        if (this.state.mode=='connected')
            return <div> 
            <p>{this.state.login}</p>
            <p>Vous êtes connecté</p>
            <button class="btn" onClick={this.disconnect}>Se déconnecter</button>
            </div>
        return <div></div>
    }
}
