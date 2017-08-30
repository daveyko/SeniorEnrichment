'use strict'
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom';
import Campuses from './CampusList.jsx';
import Students from './StudentList.jsx';
import store, {fetchStudents, fetchCampuses} from '../store'
import Navbar from './navbar.jsx';
import AddStudent from './AddStudent.jsx';
import AddCampus from './AddCampus.jsx';

export default class Main extends Component{
   constructor(){
        super()
   }
    componentDidMount(){
        store.dispatch(fetchStudents());
        store.dispatch(fetchCampuses());
    }


    render(){
      return (
      <div>
      <Navbar />
        <Switch>
          <Route exact path ="/campus" component = {Campuses} />
          <Route path = "/campus/:campusId" component = {Students} />
          <Route exact path = "/students" component = {Students} />
          <Route path = "/addStudent" component = {
            AddStudent} />
          <Route path = "/addCampus" component = {
            AddCampus} />
          <Redirect to = "/campus" />
        </Switch>
      </div>
      )
    }

}
