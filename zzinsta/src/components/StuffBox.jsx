import React, {Component} from "react";
import PropTypes from 'prop-types';
import ImageDefault from "../pics/1267937.jpg"

export default class StuffBox extends Component{
    static defaultProps ={
    imagePath: ImageDefault,
    cardText: "Nunquam demitto gemna.Pius era inciviliter falleres adiurator est.Eheu, fluctus!Valebats experimentum in " +
      "audax vierium!Fidelis fortis acceleratrix captiss pes est.Est azureus compater, cesaris. The psychic result of courage is to forget with thought."
  }

  static propTypes = {
    imagePath:  PropTypes.any.IsRequired ,
    cardText:   PropTypes.string.IsRequired,
  }

  constructor(props){
    super(props);
  }

  render(){
    return <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <img className="card-img-top" src={this.props.imagePath} alt="Image StuffBox" />
              <div className="card-body">
                <p className="card-text">{this.props.cardText}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                  </div>
                  <small className="text-muted">9 mins</small>
                </div>
              </div>

              </div>
            </div>
  }
}