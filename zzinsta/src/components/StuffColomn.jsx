import React, {Component} from "react";
import PropTypes from 'prop-types';
import StuffBox from "./StuffBox";
import {Container, Row} from 'reactstrap';
import 'react-bootstrap/lib/utils/divWithClassName'
import axios from 'axios'

export default class StuffColomn extends Component{
state ={
  posts:[]
}

  constructor(props){
    super(props);
  }

  componentDidMount(){
    axios.get('http://localhost:5000/posts')
    .then(res => {
      const posts = res.data.app;
      console.log(posts);
      this.setState({
          posts
      });
    })
    
  }

  render(){
   return(
    <div className="album py-5 bg-light">
      <Container>
        <Row>
          {this.state.posts.map( post =>
                <StuffBox imagePath={post.img} cardText={post.description} title={post.title} key={post._id.toString()}/>
                )}
        </Row>
      </Container>
    </div>
    );
  }
}
