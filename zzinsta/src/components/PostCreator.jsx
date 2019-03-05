import React, {Component} from "react";
import ImageDefault from "../pics/emptyPicture.png"
import PropTypes from 'prop-types';
import axios from 'axios'
import PostService from "./PostService";


//https://dev.to/greduan/the-anatomy-of-a-custom-inputtypefile-component
function generatePreviewImgUrl(file, callback) {
  const reader = new FileReader()
  const url = reader.readAsDataURL(file)
  reader.onloadend = e => callback(reader.result)
}

export default class StuffBox extends Component{

  static propTypes = {
    updateMethod: PropTypes.func,
  }


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
    this.generatePicture = this.generatePicture.bind(this);
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

async generatePicture(){
  let res = await axios.get('http://inspirobot.me/api?generate=true');
  console.log(res);
  if (res.status=200){
      this.setState({ img: res.data })
  }
}



async upload(event){
  if (this.state.img!=null){
    let post={
      title: this.state.title,
      description: this.state.cardText,
      img: this.state.img,
    }
    
      let res = await PostService.createPost(post)
      
      if (res==true){
        this.setState(state => ({
          img:null,
          cardText: '',
          title: ''
        }));
        this.props.updateMethod();
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
                  <div className="btn-group">
                    <button onClick={this.generatePicture} class="btn btn-primary my-2">Générer aléatoirement</button>
                  </div>

        </div>


        <div class="col-md-6">
            <h1 class="jumbotron-heading">Créer un post</h1>
              <div class="form-group">
                <label for="exampleFormControlInput1">Titre du post</label>
                <input onChange={this.changeTitle} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Votre titre" value={this.state.title}/>
              </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Texte du post</label>
                  <textarea onChange={this.changeDesc} class="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.cardText}></textarea>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <label htmlFor="PostUploadBox" class="btn btn-primary my-2">Choisir une image</label>
                  </div>
                    <input type="file" onChange={this.changeFile} id="PostUploadBox" style={fileStyle}/>
                  
                  <div className="btn-group">
                    <button onClick={this.upload} class="btn btn-success my-2">Poster</button>
                  </div>
                </div>
        </div>
	    </div>
      </div>
  }
}