import React, { Component } from 'react';

export default class Compo2 extends React.Component {

    constructor(props){
        super(props);
        this.state = {count: 0};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(state => ({
            count: state.count+1
        }));
        
    }

    render() {
        return <button onClick={this.handleClick}>Ce bouton a été clické {this.state.count} fois</button>;

    }
}
