import React, {Component} from "react";
import ImageDefault from "../pics/emptyPicture.png"
import axios from 'axios'


//https://dev.to/greduan/the-anatomy-of-a-custom-inputtypefile-component
function generatePreviewImgUrl(file, callback) {
  const reader = new FileReader()
  const url = reader.readAsDataURL(file)
  reader.onloadend = e => callback(reader.result)
}

export default class StuffBox extends Component{


  constructor(props){
    super(props);
    this.state = {
      img:null,
      cardText: '',
      title: ''
    }
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDesc = this.changeDesc.bind(this);
    this.changeFile = this.changeFile.bind(this);
    this.upload = this.upload.bind(this);
  }

  changeTitle(event){
    let val = event.target.value
    this.setState(state => ({
        title: val
    }));
}
changeDesc(event){
  let val = event.target.value
  this.setState(state => ({
      cardText: val
  }));
}


changeFile(event){
  let val = event.target.files[0]
  if (event.target.files[0]) {
    generatePreviewImgUrl(val, img => {
      this.setState({ img })
    })
  }
}
async upload(event){
  const access_token = localStorage.getItem("token");
  if (this.state.img!=null && access_token!=null){
    
    try {
      let res = await axios.post('http://localhost:5000/posts', {
        "title": this.state.title,
        "description": this.state.cardText,
        "img": this.state.img
      }, {
          headers: {
            Authorization: access_token,
            'content-type': 'application/json',
            'Content-Type': 'multipart/form-data'
          }
      });
      console.log(res);
      if (res.status=200){
        this.setState(state => ({
          img:null,
          cardText: '',
          title: ''
        }));
      }
        
    } catch (err) {
      console.error(err);
    }
  }
}



  render(){
    var fileStyle = {
      opacity: 0,
      position: 'absolute',
      pointerEvents: 'none',
    };
    return <div class="container">
    	<div class="row">
        <div class="col-md-6">
                    <img className="card-img-top" src={this.state.img==null?ImageDefault:this.state.img} alt={this.state.title} />
        </div>
        <div class="col-md-6">
          <form>
            <h1 class="jumbotron-heading">Créer un post</h1>
              <div class="form-group">
                <label for="exampleFormControlInput1">Titre du post</label>
                <input onChange={this.changeTitle} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Votre titre" value={this.state.title}/>
              </div>
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Texte du post</label>
                      <textarea onChange={this.changeDesc} class="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.cardText}></textarea>
                    </div>
                    <p>
                <label htmlFor="PostUploadBox" class="btn btn-primary my-2">Changer l'image</label>
                <input type="file" onChange={this.changeFile} className="btn btn-sm btn-outline-secondary" id="PostUploadBox" style={fileStyle}/>
                <a onClick={this.upload} class="btn btn-secondary my-2">Poster</a>
            </p>
            </form>
        </div>
	    </div>
      </div>
  }
}