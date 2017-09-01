import React, { Component } from 'react';
import store, {addCampusDb} from '../store.jsx';


export default class addCampus extends Component {
    constructor () {
    super();
    this.state = {
      campusName: '',
      campusImage: ''
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(e){
    this.setState(Object.assign({}, this.state, {campusName: e.target.value}))
  }

  handleChangeImage(e){
    this.setState(Object.assign({}, this.state, {campusImage: e.target.value}))
  }

  handleSubmit(e){
    e.preventDefault();
    let name = this.state.campusName;
    let image = this.state.campusImage;
    store.dispatch(addCampusDb({name, image}))
    this.setState(Object.assign({}, this.state, {campusName: '', campusImage: ''}))

  }


  render(){
    return (

    <form onSubmit = {this.handleSubmit} >
        <div className="form-group">
          <label>Name: </label>
            <input onChange = {this.handleChangeName} type="text" className="form-control" id="name" placeholder="Enter Name" value = {this.state.campusName}/>

          <label>Image Url: </label>
            <input onChange = {this.handleChangeImage} type="text" className="form-control" id="image" placeholder="Enter image url" value = {this.state.campusImage}/>

          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

          )
  }

}

