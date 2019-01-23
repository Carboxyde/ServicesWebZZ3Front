import React, { Component } from 'react';
import axios from 'axios'
import './Login.css';

export default class LoginInput extends React.Component {
    static defaultProps = {
        login:'Login'
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
        this.setState(state => ({
            pwd: val
        }));
    }
    async handleClick(event){
        event.preventDefault();
        if (await this.checkPassword(this.state.login, this.state.pwd))
            this.setState(state => ({
                connect:true
            }));
        else
            this.setState(state => ({
                error:"Votre identifiant ou mot de passe est incorrect"
            }));
    }

    async disconnect(event){
        localStorage.removeItem("token");
        this.setState(state => ({
            connect:false
        }));
    }

    async checkPassword(login, pwd){
        let result=false;

        try {
            let res = await axios.post("http://localhost:5000/login", {
                "username": login,
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
            return  <form
                        style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "80vw",
                        margin: "auto",
                        marginTop: "20px"
                        }}
                        >
                        <input onChange={this.changeLogin} type="text" placeholder="Mail de l'utilisateur" value={this.state.login}/>
                        <input onChange={this.changePassword} type="password" placeholder="Mot de passe" value={this.state.pwd}/>
                        <button onClick={this.handleClick}>Se connecter</button>
                    </form>; 
        else
            return <div
            style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "80vw",
            margin: "auto",
            marginTop: "20px"
            }}
            > 
            <p>{this.state.login}</p>
            <p>Vous êtes connecté</p>
            <button onClick={this.disconnect}>Se déconnecter</button>
            </div>
        
    }
}
