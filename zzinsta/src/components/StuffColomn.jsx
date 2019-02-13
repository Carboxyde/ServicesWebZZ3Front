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

static propTypes = {
  UserId:   PropTypes.string,
}

  constructor(props){
    super(props);
    this.removePost=this.removePost.bind(this)
  }
  

  componentDidMount(){
      this.loadPosts(this.props.UserId);    
  }
  componentDidUpdate(oldProps) {
    const newProps = this.props
    if(oldProps.UserId !== newProps.UserId) {
      this.loadPosts(this.props.UserId); 
    }
  }


  async loadPosts(UserId){
    console.log(UserId)
    try {
      const access_token = localStorage.getItem("token");
      if (access_token!=null) {
        let options;
        if (UserId!=null)
          options = {
            method: "get",
            headers: {
              Authorization: access_token,
              "Content-Type": "application/json"
            },
            url: "http://localhost:5000/posts/user",
            data: {
            },
            params: {
              per_page: 20,
              userId: UserId,
            }
          };
        else
          options = {
            method: "get",
            headers: {
              Authorization: access_token,
              "Content-Type": "application/json"
            },
            url: "http://localhost:5000/posts",
            data:{
            },
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
    if (this.state.posts.length>0){
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
    else{
      return(
       <div className="album py-5 bg-light">
         <Container>
             Il n'y a pas encore de contenu ici, pourquoi ne pas créer le votre ?
         </Container>
       </div>
      );
    }
  }
}
