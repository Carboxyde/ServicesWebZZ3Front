import React, {Component} from "react";
import PropTypes from 'prop-types';
import ImageDefault from "../pics/1267937.jpg"
import PostService from "./PostService";

export default class StuffBox extends Component{
  
  constructor(props){
    super(props);
    this.delete=this.delete.bind(this)
  }

    static defaultProps ={
      title:"Hello World",
    imagePath: ImageDefault,
    cardText: "Nunquam demitto gemna.Pius era inciviliter falleres adiurator est.Eheu, fluctus!Valebats experimentum in " +
      "audax vierium!Fidelis fortis acceleratrix captiss pes est.Est azureus compater, cesaris. The psychic result of courage is to forget with thought."
  }

  static propTypes = {
    imagePath:  PropTypes.any.isRequired,
    cardText:   PropTypes.string.isRequired,
    title:      PropTypes.string.isRequired,
    isOwner:    PropTypes.bool,
    postId:     PropTypes.string.isRequired,
    selfDestruct: PropTypes.func,
  }


  async delete(event){
        let res = await PostService.deletePost(this.props.postId);
        console.log(res);
        if (res==true){
          this.props.selfDestruct(this.props.postId)
        }
  }
  

  render(){
    return <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <h2>{this.props.title}</h2>
              <img className="card-img-top" src={this.props.imagePath} alt={this.props.title} />
              <div className="card-body">
                <p className="card-text">{this.props.cardText}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">J'apprécie</button>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-danger" hidden={!this.props.isOwner} onClick={this.delete}>Supprimer</button>
                  </div>
                </div>
              </div>

              </div>
            </div>
  }
}