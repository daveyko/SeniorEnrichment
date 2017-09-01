import React, { Component } from 'react';
import { Link } from "react-router-dom";
import store, {deleteCampusDb, editCampusDb} from '../store.jsx'


//the campus child component only has a local state which largely handles the case that the editMode prop passed from the parent is true. If so, this child largely functions as a form to handle any edits to a particular campus via buttons 'delete' and 'edit'. Otherwise, it mainly functions to display the image, and name of each campus.


export default class Campus extends Component {
    constructor (props) {
      super(props);
      this.state = {
      editMode: false,
      newName: '',
      newUrl: ''

    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEdit (){
      this.setState({editMode: !this.state.editMode})
    }

    handleDelete (id){
      store.dispatch(deleteCampusDb(id))
    }

    handleChangeName(e){
      this.setState({newName: e.target.value})
      }

    handleChangeUrl(e){
      this.setState({newUrl: e.target.value})
    }

    handleSubmit(e){
      e.preventDefault();
      store.dispatch(editCampusDb({id: this.props.campusProp.id, name: this.state.newName, image: this.state.newUrl}))
      this.setState({editMode: false})
      }

    render() {
      if (!this.state.editMode) {
        return (
      <div className="col-md-4">
      {/* The image is a link to the single campus route} */}
        <Link to = {"/campus/" + this.props.campusProp.id}>
          <img id = "campus" src = {this.props.campusProp.image} height = "256" width = "256" />
        </Link>
          <div className = "caption">
            <h5>
              <span>{this.props.campusProp.name} </span>
              {this.props.removeMode ?
                <button onClick = {() => this.handleDelete(this.props.campusProp.id)} type="button" className="btn btn-outline-danger">Remove</button> : <div></div>}
              {this.props.removeMode ?
                <button onClick = {this.handleEdit} type="button" className="btn btn-outline-primary">Edit</button> : <div></div>}
            </h5>
          </div>
        </div>
                )
        } else {

        return (

        <div className="col-md-4">
        <Link to = {"/campus/" + this.props.campusProp.id}>
          <img id = "campus" src = {this.props.campusProp.image} height = "256" width = "256" />
        </Link>
          <div className = "caption">
            <h5>
            <form className = "tr" onSubmit = {this.handleSubmit}>

              <span>
                <label>Name: </label>
                <input onChange = {this.handleChangeName} value = {this.state.newName} placeholder = {this.props.campusProp.name} type = "text" className = "form-control" />
              </span>

              <span>
                <label>ImageUrl: </label>
                <input onChange = {this.handleChangeUrl} value = {this.state.newUrl} type = "text" className = "form-control" /></span>

              {this.props.removeMode ?
                <button onClick = {() => this.handleDelete(this.props.campusProp.id)} type="button" className="btn btn-outline-danger">Remove</button> : <div></div>}

              {this.props.removeMode ?
                <button onClick = {this.handleEdit} type="button" className="btn btn-outline-primary">Edit</button> : <div></div>}

              <button type="submit" className="btn btn-outline-success">Submit</button>

              </form>
            </h5>
          </div>
        </div>
          )
    }

  }
}

