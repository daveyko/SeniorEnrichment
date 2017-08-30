import { combineReducers } from 'redux'
import axios from 'axios';


const initialState = {
  students: [],
  campuses: [],

}

const GET_STUDENTS = "GET_STUDENTS"
const GET_CAMPUSES = "GET_CAMPUSES"
const ADD_CAMPUS = "ADD_CAMPUSES"
const ADD_STUDENT = "ADD_STUDENT"
const DELETE_STUDENT = "DELETE_STUDENT"
const DELETE_CAMPUS = "DELETE_CAMPUS"

const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, {students: action.students})
    case GET_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses})
    case ADD_CAMPUS:
      return Object.assign({}, state, {campuses: [...state.campuses, action.campus]})
    case ADD_STUDENT:
      return Object.assign({}, state, {students: [...state.students, action.student]})
    case DELETE_STUDENT:
      return Object.assign({}, state, {students: state.students.filter((student) => {
        return student.id !== action.studentId
      })})
    case DELETE_CAMPUS:
      return Object.assign({}, state, {campuses : state.campuses.filter((campus) => {
          return campus.id !== action.campusId
      })})
    default: return state
  }
};

export default rootReducer
