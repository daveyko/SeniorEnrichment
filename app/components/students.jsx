import React, { Component } from 'react';
import store, {deleteStudentDb, editStudentDb} from '../store.jsx';
import {Link } from "react-router-dom";


export default class Student extends Component {

        constructor(props){
            super(props)
            this.state = {
              editMode: false,
              firstName: '',
              lastName: '',
              email: '',
              campusId: 0,
              campuses: store.getState().campuses

        }
            this.handleDelete = this.handleDelete.bind(this);
            this.handleEdit = this.handleEdit.bind(this);
            this.handleChangeLastName = this.handleChangeLastName.bind(this);
            this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
            this.handleChangeEmail = this.handleChangeEmail.bind(this);
            this.submitHandler = this.submitHandler.bind(this);
            this.handleChangeCampus = this.handleChangeCampus.bind(this);
        }

        handleDelete(e) {
          store.dispatch(deleteStudentDb(this.props.studentProp.id))
        }

        handleEdit(e){
          this.setState({editMode: !this.state.editMode})
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

        submitHandler(e){
          e.preventDefault();
          store.dispatch(editStudentDb({ id: this.props.studentProp.id, firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, campusId: this.state.campusId}))
          this.setState({editMode : false})
        }



        render(){

        if (!this.state.editMode) {
            return (
            <div className="tr">
              <span className = "td">{this.props.studentProp.firstName}</span>
              <span className = "td">{this.props.studentProp.lastName}</span>
              <span className = "td">{this.props.studentProp.email}</span>
              <span className = "td">{!this.props.studentProp.campusId ?
                'NA' : this.props.studentProp.campus.name}</span>

              <span className = "td"> <button onClick = {this.handleEdit} type="button" className="btn btn-outline-primary">Edit</button> </span>

              <span className = "td">
                <button onClick = {this.handleDelete} type="button" className="btn btn-outline-danger">Remove</button>
              </span>

              <span className = "td">
                <Link to = {"/student/" + this.props.studentProp.id}>
                  <button type="button" className="btn btn-outline-primary">View</button>
                </Link>
              </span>
            </div>
                    )
          } else {
        return (
                <form className="tr" onSubmit = {this.submitHandler}>
                  <span className = "td"><input onChange = {this.handleChangeFirstName} id = "firstName" type = "text" className = "form-control" placeholder = {this.props.studentProp.firstName} value = {this.state.firstName} /></span>
                  <span className = "td"><input onChange = {this.handleChangeLastName} id = "lastName" type = "text"
                    className = "form-control" placeholder = {this.props.studentProp.lastName} value = {this.state.lastName} /></span>
                  <span className = "td"><input onChange = {this.handleChangeEmail} id = "email" type = "text" className = "form-control" placeholder = {this.props.studentProp.email} value = {this.state.email} /></span>
                  <span className = "td"><select onChange = {this.handleChangeCampus} className = "form-control">
                        <option>select campus</option>
                        {this.state.campuses.map((campus) => {
                      return (
                          <option key = {campus.id} value = {campus.id}>{campus.name}</option>
                      )})}
                        </select></span>
                  <span className = "td"> <button onClick = {this.handleEdit} type="button" className="btn btn-outline-primary">Edit</button></span>
                  <span className = "td"> <button onClick = {this.handleDelete} type="button" className="btn btn-outline-danger">Remove</button></span>
                  <span className = "td"> <Link to = {"/student/" + this.props.studentProp.id}><button type="button" className="btn btn-outline-primary">View</button></Link></span>
                  <span className = "td"> <button type ="submit" className = "btn btn-outline-primary">Submit</button></span>
                </form>

                )


      }

  }
}
