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
    this.removePost=this.removePost.bind(this)
  }
  

  componentDidMount(){
    this.loadPosts();
    
  }


  async loadPosts(){
    try {
      const access_token = localStorage.getItem("token");
      const userId = localStorage.getItem("UserId");
      if (access_token!=null && userId!=null) {
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
  
  removePost(postId) {
    var array = [...this.state.posts]; // make a separate copy of the array
    var index = array.findIndex(post => post._id == postId)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({posts: array});
    }
}

  render(){
    const userId = localStorage.getItem("UserId");
   return(
    <div className="album py-5 bg-light">
      <Container>
        <Row>
          {this.state.posts.map( post =>
                <StuffBox imagePath={post.img} cardText={post.description} title={post.title} key={post._id} isOwner={userId==post.userId} postId={post._id} selfDestruct={this.removePost}/>
                )}
        </Row>
      </Container>
    </div>
    );
  }
}
