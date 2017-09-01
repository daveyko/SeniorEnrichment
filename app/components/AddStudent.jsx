import React, { Component } from 'react';
import store, {addStudentDb} from '../store.jsx';
import {connect} from 'react-redux';

export default class addStudent extends Component {
    constructor () {
    super();
    this.state = {
      lastName: '',
      firstName: '',
      email: '',
      image: '',
      campusId: 0
    }


    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCampus = this.handleChangeCampus.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  handleChangeLastName(e){
    this.setState(Object.assign({}, this.state, {lastName: e.target.value}))
  }

  handleChangeFirstName(e){
    this.setState(Object.assign({}, this.state, {firstName: e.target.value}))
  }

  handleChangeEmail(e){
    this.setState(Object.assign({}, this.state, {email: e.target.value}))
  }

  handleChangeCampus(e){

    this.setState({campusId: e.target.value})

  }

  handleChangeUrl(e){

    this.setState({image: e.target.value})

  }

  handleSubmit(e){
    e.preventDefault();
    let lastName = this.state.lastName
    let firstName = this.state.firstName
    let email = this.state.email
    let campusId = this.state.campusId
    let image = this.state.image
    store.dispatch(addStudentDb({lastName, firstName, email, image, campusId}))
    this.setState(Object.assign({}, this.state, {lastName: '', firstName: '', email: '', image: '', campusId: 0}))


  }

  render(){

  return (
    <form onSubmit = {this.handleSubmit}>
        <div className="form-group">
          <label>Last Name: </label>
            <input onChange = {this.handleChangeLastName} type="text" className="form-control" id="lastName" placeholder="Enter Last Name" value = {this.state.lastName} />
          <label>First Name: </label>
            <input onChange = {this.handleChangeFirstName} type="text" className="form-control" id="firstName" placeholder="Enter First Name" value = {this.state.firstName} />
          <label>Email: </label>
            <input onChange = {this.handleChangeEmail} type="text" className="form-control" id="email" placeholder="Enter Email" value = {this.state.email}/>
          <label>ImageUrl: </label>
            <input onChange = {this.handleChangeUrl} type="text" className="form-control" id="email" placeholder="Enter Url" value = {this.state.image}/>
          <label>Campus:</label>
            <select onChange = {this.handleChangeCampus} className = "form-control">
                      <option>Select Campus</option>
            {store.getState().campuses.map((campus) => {
              return (
                      <option key = {campus.id} value = {campus.id}>{campus.name}</option>
                      )
            })}
          </select>
          <button id = "submit" type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

          )
  }

}


