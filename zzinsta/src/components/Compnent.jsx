import React, {Component} from "react";

export class Compnent extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick().bind(this);
  }

  render(){
    return (<div>Bonjour</div>);
  }

  handleClick() {
    return (<div>That's a click</div>);
  }
}