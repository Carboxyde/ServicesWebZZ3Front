import React, {Component} from "react";
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
    this.loadPosts();
/*
    axios.get('http://localhost:5000/posts')
    .then(res => {
      const posts = res.data.app;
      console.log(posts);
      this.setState({
          posts
      });
    })   
    */
  }

  async loadPosts(){
    try {
      const access_token = localStorage.getItem("token");
      if (access_token!=null) {
      const options = {
        method: "get",
        headers: {
          Authorization: access_token,
          "Content-Type": "application/json"
        },
        url: "http://localhost:5000/posts",
        dat:{},
        params: {
          per_page: 20
        }
      };
      let res = await axios(options);
      this.setState({ posts: res.data.app });
    }
    } catch (err) {
      alert("erreur");
    }
    

  }

  render(){
   return(
    <div className="album py-5 bg-light">
      <Container>
        <Row>
          {this.state.posts.map( post =>
                <StuffBox imagePath={post.img} cardText={post.description} title={post.title} key={post._id.toString()} isOwner={true}/>
                )}
        </Row>
      </Container>
    </div>
    );
  }
}
