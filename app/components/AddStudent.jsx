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
      campusId: store.getState().campuses[0].id || null
    }


    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCampus = this.handleChangeCampus.bind(this);
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
    let campusName = e.target.value;
    let campusId = store.getState().campuses.filter((campus) => {
      return campus.name === campusName
    })[0].id
    this.setState({campusId: campusId})

  }

  handleSubmit(e){
    e.preventDefault();
    let lastName = this.state.lastName
    let firstName = this.state.firstName
    let email = this.state.email
    let campusId = this.state.campusId
    store.dispatch(addStudentDb({lastName, firstName, email, campusId}))
    this.setState(Object.assign({}, this.state, {lastName: '', firstName: '', email: '', campusId: store.getState().campuses[0].id}))


  }

  render(){
  return (
    <form onSubmit = {this.handleSubmit}>
        <div className="form-group">
          <label>Last Name: </label>
          <input onChange = {this.handleChangeLastName} type="text" className="form-control" id="lastName" placeholder="Enter Last Name" value = {this.state.lastName}/>
          <label>First Name: </label>
          <input onChange = {this.handleChangeFirstName} type="text" className="form-control" id="firstName" placeholder="Enter First Name" value = {this.state.firstName}/>
          <label>Email: </label>
          <input onChange = {this.handleChangeEmail} type="text" className="form-control" id="email" placeholder="Enter Email" value = {this.state.email}/>
          <label>Campus:</label>
          <select onChange = {this.handleChangeCampus} className = "form-control">
            {store.getState().campuses.map((campus) => {
              return (
                      <option key = {campus.id} value = {campus.name}>{campus.name}</option>
                      )
            })}
          </select>
          <button id = "submit" type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

          )
  }

}


