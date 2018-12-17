import React, {Component} from "react";
import PropTypes from 'prop-types';
import StuffBox from "./StuffBox";
import {Container, Row} from 'reactstrap';
import 'react-bootstrap/lib/utils/divWithClassName'

export default class StuffColomn extends Component{
  constructor(props){
    super(props);
  }

  render(){
   let stuffBoxes = [];

    for(var i = 0; i<3; i++){
      stuffBoxes.push(<StuffBox />);
    }

   return(

    <div className="album py-5 bg-light">
      <Container>
        <Row>
          <div>{stuffBoxes}</div>
        </Row>
      </Container>
    </div>
    );
  }
}
