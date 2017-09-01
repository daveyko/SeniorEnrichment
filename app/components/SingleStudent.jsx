import React, { Component } from 'react';
import store, {fetchStudents} from '../store.jsx';
import { Link } from "react-router-dom";

//This component is linked to from the view button on the student component. It is subscribed to the redux store state, but on refresh, a component will need to mount for the redux store state to be accessible so that the correct student info can be rendered, since no props are passed

export default class SingleStudent extends Component{

  constructor(props){
        super(props)
        this.state = store.getState()
   }


  componentDidMount (){
            store.dispatch(fetchStudents());
            this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
        }

  componentWillUnmount() {
            this.unsubscribe();
        }



  render(){
    //we need to check if the students array has been populated. Otherwise, on a refresh it may try to render items that are not yet available for the component to render.
    let student = this.state.students.filter((stud) => {
                    return +this.props.match.params.studentId === stud.id
              })[0]
      if (this.state.students.length){
      return (

          <div className = "container">
            <div className = "row">
              <div className = "col-md-12">
                  <Link to = {"/editPic/" + student.id}>
                    <img src = {student.image} id = "player" height = "450" width = "350"/>
                  </Link>
                  <p>{student.firstName + ' ' + student.lastName}</p>
                  <p>{student.email}</p>
                  <Link to = {"/campus/" + student.campusId}>
                    <p>{!student.campus ? 'N/A' : student.campus.name }</p>
                  </Link>
              </div>
            </div>
          </div>

          );
    }
    else {
      return (
              <div></div>
              )
    }
  }

}
