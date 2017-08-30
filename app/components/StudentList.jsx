import React, { Component } from 'react';
import axios from 'axios';
import Student from './students.jsx'
import store, {fetchStudents} from '../store.jsx';
import {connect} from 'react-redux';
import { Route, Switch, Link } from "react-router-dom";

export default class StudentList extends Component {

        constructor(props){
            super(props)
            this.state = store.getState();
        }

        componentDidMount (){
            store.dispatch(fetchStudents());
            this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
        }

        componentWillUnmount() {
            this.unsubscribe();
        }





        render(){
        let students;
        if (this.props.match.params.campusId) {
            students = this.state.students.filter((student) => {
          return student.campusId === +this.props.match.params.campusId
        })
        }
        else {
          students = this.state.students
        }

        return (
          <div>
          <Link to = "/addStudent">
          <button type="button" className="btn btn-outline-primary">Add</button>
          </Link>
          <form>
            <div className = "form-group">
              <table className = "table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Campus</th>
                    <th>Edit</th>
                    <th>Remove</th>
                    <th>View</th>
                    <th>Submit</th>
                  </tr>
                </thead>
            {students.map((student) => {
              return (

                      <tbody key = {student.id}>
                        <Student studentProp = {student}/>
                      </tbody>

                     )})}
            </table>
          </div>
        </form>
        </div>
                )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     students: state.students
//   }
// }

// const newStudentListContainer = connect(mapStateToProps)(StudentList);

// export default newStudentListContainer;





