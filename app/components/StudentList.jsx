import React, { Component } from 'react';
import Student from './students.jsx'
import store, {fetchStudents, fetchCampuses} from '../store.jsx';
import { Link } from "react-router-dom";

//We need a componentDidMount to fetch all the students and associated campuses once the StudentList parent component has been rendered. The StudentList parent component gets its state from the redux store, and so it has to subscribe to the store to listen for any potential state changes. The studentlist renders the names of the columns of the child student component it will render
export default class StudentList extends Component {

        constructor(props){
            super(props)
            this.state = store.getState();
        }
        componentDidMount (){
            store.dispatch(fetchStudents());
            store.dispatch(fetchCampuses());
            this.unsubscribe = store.subscribe(() => this.setState(store.getState()))

        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        render (){

        let students;
        let selectedCampus;
        let imageUrl;
        let campusName;
        //if we navigated to the page from a campus image link (thus having a truthy this.props.campusId, then we will want to render a campus image, campus name header, and students w/ a specific studentId. If we navigated from the students link in the navbar, we will want to render all students
        if (this.props.campusId) {
            students = this.state.students.filter((student) => {
          return student.campusId === +this.props.campusId
        })
          selectedCampus = this.state.campuses.filter((campus) => {
            return campus.id === +this.props.campusId
          })[0]

          imageUrl = selectedCampus ? selectedCampus.image : null
          campusName = selectedCampus ? selectedCampus.name : null
        }

        else {
          students = this.state.students
        }
       //we need this conditional so that we will render the necessary DOM elements upon refresh. When we refresh the page, we don't have the populated redux store state accessible until the component renders, and the fetchStudents and campuses request is made to the server. So once the addplayer button is rendered, the client makes a request to the server to populate the redux state, and our proper components are re-rendered
        if ((imageUrl && campusName) || (!this.props.campusId && students.length)) {
        return (
          <div className = "container">
            <div className = "row">
              <div className="col-md-12">
                <h3 className = "display-3">
                  {imageUrl ? campusName : 'Players'}</h3>
                  {imageUrl ? <img id = "thumbnail" src = {imageUrl} className = "rounded mx-auto d-block" /> : <div></div>}
                  <Link to = "/addStudent">
                    {imageUrl ? <div></div> : <button id = "addPlayer" type="button" className="btn btn-outline-primary">Add Player</button>}
                  </Link>
                    <div className="table">
                      <div className = "tr">
                        <span className = "td">First Name</span>
                        <span className = "td">Last Name</span>
                        <span className = "td">Email</span>
                        <span className = "td">Campus</span>
                        <span className = "td">Edit</span>
                        <span className = "td">Remove</span>
                        <span className = "td">View</span>
                      </div>
            {students.map((student) => {
              return (

                        <Student key = {student.id} studentProp = {student} imageUrl = {imageUrl} />


                  )})}
          </div>
        </div>
      </div>
    </div>
                )
      }

      else {
        return (
                <div>
                  <Link to = "/addStudent">
                    {imageUrl ? <div></div> : <button id = "addPlayer" type="button" className="btn btn-outline-primary">Add Player</button>}
                  </Link>
                </div>
              )
    }
  }
}


