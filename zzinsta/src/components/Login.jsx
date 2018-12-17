import React, { Component } from 'react';

export default class LoginInput extends React.Component {
    static defaultProps = {
        login:'Login'
    }


    constructor(props){
        super(props);
        this.state =  {
            login:'',
            pwd:'',
            connect:false
        };
        this.handleClick = this.handleClick.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
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
    handleClick(event){
        event.preventDefault();
        if (this.state.login=="admin" && this.state.pwd=="Password1")
            this.setState(state => ({
                connect:true
            }));
    }

    render() {
        if (!this.state.connect)
        return <div>
            <form >
            <p> Login : </p>
            <input onChange={this.changeLogin} type="text" value={this.state.login}/>
            <p> Mot de passe : </p>
            <input onChange={this.changePassword} type="text" value={this.state.pwd}/>
            <button onClick={this.handleClick}>Valider</button>
            </form>
        </div>;
        else
            return <div> Vous êtes connecté</div>
        
    }
}
