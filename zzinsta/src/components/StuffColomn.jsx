import React, {Component} from "react";
import PropTypes from 'prop-types';
import StuffBox from "./StuffBox";

export default class StuffColomn extends Component{
  constructor(props){
    super(props);
  }

  render(){
   let stuffBoxes = [];

    for(var i = 0; i<9; i++){
      stuffBoxes.push(<StuffBox />);
    }

   return(
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">
          <div>{stuffBoxes}</div>
        </div>
      </div>
    </div>
    );
  }
}
