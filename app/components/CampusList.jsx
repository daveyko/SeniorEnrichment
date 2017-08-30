import React, { Component } from 'react';
import axios from 'axios';
import Campus from './campuses.jsx'
import store, {fetchCampuses} from '../store.jsx';
import {connect} from 'react-redux';
import { Route, Switch, Link } from "react-router-dom";

class CampusList extends Component {
    constructor () {
      super();
      this.state = {
      editMode: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }
    componentDidMount () {
      store.dispatch(fetchCampuses());

    }

    handleClick(e){
      let currentState = this.state.editMode
      this.setState({editMode: !currentState})
    }

    render() {


        return (
          <div className="col-xs-10">
              <h3>Campuses</h3>
              <Link to = "/addCampus">
              <button type="button" className="btn btn-primary">Add</button>
              </Link>
              <button onClick = {this.handleClick} type="button" className="btn btn-outline-primary">Edit Mode</button>
                <div className = "row">
            {this.props.campuses.map((campus) =>{
              return (
                      <div key = {campus.id}>
                      <Campus campusProp = {campus} editMode = {this.state.editMode}/>
                      </div>
                     )})}
                </div>
          </div>
                )
      }
}


  const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

  const newCampusListContainer = connect(mapStateToProps)(CampusList);

  export default newCampusListContainer;
