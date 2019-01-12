import React, { Component } from 'react';
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
            connect:false,
            error:'',
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
        if (this.checkPassword(this.state.login, this.state.pwd))
            this.setState(state => ({
                connect:true
            }));
        else
            this.setState(state => ({
                error:"Votre identifiant ou mot de passe est incorrect"
            }));
    }
    checkPassword(login, pwd){
        let result=false;
        if (login==="admin" && pwd==="Password1"){
            result = true
        }
        return result;
    }

    render() {
        if (!this.state.connect)
        return <div>
                <form >
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <p className="errorMsg">{this.state.error}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> Login : </p>
                                </td>
                                <td>
                                    <input onChange={this.changeLogin} type="text" value={this.state.login}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> Mot de passe : </p>
                                </td>
                                <td>
                                    <input onChange={this.changePassword} type="password" value={this.state.pwd}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button onClick={this.handleClick}>Valider</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>;
        else
            return <div> Vous êtes connecté</div>
        
    }
}
