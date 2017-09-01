'use strict'
import React, {Component} from 'react'
import {render} from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import Campuses from './CampusList.jsx';
import Students from './StudentList.jsx';
import Student from './SingleStudent.jsx';
import Home from './home.jsx';
import Navbar from './navbar.jsx';
import AddStudent from './AddStudent.jsx';
import AddCampus from './AddCampus.jsx';
import EditPicture from './EditPicture.jsx'

export default class Main extends Component{
   constructor(){
        super()
   }


    render (){
      return (
      <div>
      <Navbar />
        <Switch>
          <Route exact path ="/campuses" component = {Campuses} />
          <Route path = "/campus/:campusId" render = {(routeProps) => <Students campusId = {routeProps.match.params.campusId} /> } />
          <Route exact path = "/students" component = {Students} />
          <Route path = "/student/:studentId" component = {Student} />
          <Route path = "/addStudent" component = {
            AddStudent} />
          <Route path = "/addCampus" component = {
            AddCampus} />
          <Route path = "/editPic/:studentId" render = {(routeProps) => <EditPicture studentId = {routeProps.match.params.studentId} /> } />
          <Route path = "/" component = {Home} />
        </Switch>
      </div>
      )
    }

}


