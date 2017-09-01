import React, { Component } from 'react';
import {connect} from 'react-redux';
import store, {editStudentDb} from '../store.jsx';


export default class editPic extends Component {

        constructor(props){
            super(props)
            this.state = {
              students: store.getState().students,
              imageUrl: store.getState().students.filter((student) => student.id === +this.props.studentId)[0].image
        }
          this.changeHandler = this.changeHandler.bind(this)
          this.submitHandler = this.submitHandler.bind(this)
      }

        changeHandler(e) {

          this.setState({
            imageUrl: e.target.value
          })

          console.log(this.state.imageUrl)
        }

        submitHandler(e){
          e.preventDefault();
          store.dispatch(editStudentDb({id: this.props.studentId, image: this.state.imageUrl }))
          this.setState({
            imageUrl: ''
          })
        }



        render(){
          return (
                  <form onSubmit = {this.submitHandler}>
                  <label>ImageUrl: </label>
                    <input onChange = {this.changeHandler} type = "text" id = "imageUrl" value = {this.state.imageUrl} />
                    <button id = "submit" type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  )

        }



}
