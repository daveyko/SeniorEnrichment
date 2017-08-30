import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import {deleteCampusDb} from '../store.jsx'
import {connect} from 'react-redux';





function Campus (props){
    let deleteButton;
    if (props.editMode){
      deleteButton = <button onClick = {() => props.handleClick(props.campusProp.id)} type="button" className="btn btn-danger">Remove</button>
    } else {
      deleteButton = null;
    }
    return (

        <div className="col-xs-4">
        <Link to = {"/campus/" + props.campusProp.id}>
          <img src = {props.campusProp.image} height = "256" width = "256" />
        </Link>
          {deleteButton}
          <div className = "caption">
            <h5>
              <span>{props.campusProp.name}</span>
            </h5>
          </div>
        </div>

          )
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: id => {
      dispatch(deleteCampusDb(id))
    }
  }

}


const campusesContainer = connect(mapStateToProps, mapDispatchToProps)(Campus)

export default campusesContainer;
