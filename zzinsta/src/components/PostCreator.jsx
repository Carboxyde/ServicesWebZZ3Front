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
upload(event){
  if (this.state.img!=null){
    axios.post('http://localhost:5000/posts', {
      "title": this.state.title,
      "description": this.state.cardText,
      "img": this.state.img
  }, {
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
    });
  }
}



  render(){
    var fileStyle = {
      opacity: 0,
      position: 'absolute',
      pointerEvents: 'none',
    };
    return <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <h2><input type="text" onChange={this.changeTitle} value={this.state.title}/></h2>
              <img className="card-img-top" src={this.state.img==null?ImageDefault:this.state.img} alt={this.state.title} />
              <div className="card-body">
                <input className="card-text" type="textarea" onChange={this.changeDesc} value={this.state.cardText}/>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" onClick={this.upload} className="btn btn-sm btn-outline-secondary" >Poster</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary"><label htmlFor="PostUploadBox">Changer l'image</label></button>
                    <input type="file" onChange={this.changeFile} className="btn btn-sm btn-outline-secondary" id="PostUploadBox" style={fileStyle}/>
                  </div>
                </div>
              </div>

              </div>
            </div>
  }
}