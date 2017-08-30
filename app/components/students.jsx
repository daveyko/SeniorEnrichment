import React, { Component } from 'react';
import {connect} from 'react-redux';
import store, {deleteStudentDb, fetchStudents, editStudentDb} from '../store.jsx';


export default class Student extends Component {
  // studentId = props.studentProp.id
        constructor(props){
            super(props)
            this.state = {
              editMode: false,
              firstName: '',
              lastName: '',
              email: '',
              campusId: null,
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
            let campusName = e.target.value;
            let campusId = this.store.campuses.filter((campus) => {
            return campus.name === campusName})[0].id
            this.setState({campusId: campusId})

        }

        submitHandler(e){
          e.preventDefault();
          store.dispatch(editStudentDb({firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, campusId: this.state.campusId}))
        }

        // componentDidMount (){
        //     store.dispatch(fetchStudents());
        //     this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
        // }

        // componentWillUnmount() {
        //     this.unsubscribe();
        // }

        render(){

        if (!this.state.editMode) {
          if (!this.props.studentProp.campusId){
            return (
            <tr>
            <td>{this.props.studentProp.firstName}</td>
            <td>{this.props.studentProp.lastName}</td>
            <td>{this.props.studentProp.email}</td>
            <td>N/A</td>
            <td> <button onClick = {this.handleEdit} type="button" className="btn btn-secondary">Edit</button></td>
            <td> <button onClick = {this.handleDelete} type="button" className="btn btn-danger">Remove</button></td>
            <td> <button type="button" className="btn btn-secondary">View</button></td>
            </tr>
                    )

          }
          else {
            let campusElement = this.state.campuses.filter((campus) => {
            return campus.id === this.props.studentProp.campusId
          })
          return (
          <tr>
            <td>{this.props.studentProp.firstName}</td>
            <td>{this.props.studentProp.lastName}</td>
            <td>{this.props.studentProp.email}</td>
            <td>{campusElement[0].name}</td>
            <td> <button onClick = {this.handleEdit} type="button" className="btn btn-secondary">Edit</button></td>
            <td> <button onClick = {this.handleDelete} type="button" className="btn btn-danger">Remove</button></td>
            <td> <button type="button" className="btn btn-secondary">View</button></td>
          </tr>
            )

        }
      }

      else {
        return (

                <tr>
                  <td><input onChange = {this.handleChangeFirstName} id = "firstName" type = "text" className = "form-control" placeholder = {this.props.studentProp.firstName} value = {this.state.firstName} /></td>
                  <td><input onChange = {this.handleChangeLastName} id = "lastName" type = "text"
                    className = "form-control" placeholder = {this.props.studentProp.lastName} value = {this.state.lastName} /></td>
                  <td><input onChange = {this.handleChangeEmail} id = "email" type = "text" className = "form-control" placeholder = {this.props.studentProp.email} value = {this.state.email} /></td>
                  <td><select onChange = {this.handleChangeCampus} className = "form-control">
                        {this.state.campuses.map((campus) => {
                      return (
                          <option key = {campus.id} value = {campus.name}>{campus.name}</option>
                      )})}
                        </select></td>
                  <td> <button onClick = {this.handleEdit} type="button" className="btn btn-secondary">Edit</button></td>
                  <td> <button onClick = {this.handleDelete} type="button" className="btn btn-danger">Remove</button></td>
                  <td> <button type="button" className="btn btn-secondary">View</button></td>
                  <td> <button type ="submit" className = "btn btn-outline-primary">Submit</button></td>
                </tr>

                )


      }

  }
}

// const mapStateToProps = (state) => {
//   return {
//     students: state.students
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//       handleClick: (e) => {
//       dispatch(deleteStudentDb(studentId))
//     }
//   }
// }

// const newStudentContainer = connect(mapStateToProps, mapDispatchToProps)(Student);
// export default newStudentContainer;
