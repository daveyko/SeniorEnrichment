import React, { Component } from 'react';
import Campus from './campuses.jsx'
import store, {fetchCampuses} from '../store.jsx';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";


//We have both a this.state representing the local state of whether or not we are in edit mode and the redux central state  which we obtain by using mapStateToProps and connect. We need a componentDidMount to send a dispatch to the store to fetch all campuses so that our campus components will be rendered


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
          <div className = "container-fluid">
              <h3 className = "display-3">Campuses</h3>
                <div className = "btn-group" role = "group" aria-label="Basic example">
                      <Link to = "/addCampus">
                        <button type="button" className="btn btn-outline-primary float-right">Add Campus</button>
                      </Link>
                          <button onClick = {this.handleClick} type="button" className="btn btn-outline-primary">Edit Mode</button>
                </div>
                <div className = "row">
            {this.props.campuses.map((campus) => {
              return (
                      <Campus key = {campus.id} campusProp = {campus} removeMode = {this.state.editMode} />
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
