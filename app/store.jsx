import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))

export default store;

export const GET_STUDENTS = "GET_STUDENTS";
export const GET_CAMPUSES = "GET_CAMPUSES";
export const ADD_CAMPUS = "ADD_CAMPUS"
export const ADD_STUDENT = "ADD_STUDENT"
export const DELETE_STUDENT = "DELETE_STUDENT"
export const DELETE_CAMPUS = "DELETE_CAMPUS"

const getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students
    }
}

const getCampuses = (campuses) => {
  return {
    type: GET_CAMPUSES,
    campuses
  }
}

const addCampus = (campus) => {
  return {
    type: ADD_CAMPUS,
    campus
  }
}

const addStudent = (student) => {
  return {
    type: ADD_CAMPUS,
    student
  }
}

const deleteStudent = (studentId) => {
  return {
    type: DELETE_STUDENT,
    studentId
  }
}

const deleteCampus = (campusId) => {
  return {
    type: DELETE_CAMPUS,
    campusId
  }
}

export const fetchStudents = () => {
  return (dispatch) =>{
  return axios.get('/api/students')
  .then(res => res.data)
  .then(students => {
    dispatch(getStudents(students))
  })
  }
}

export const fetchCampuses = () => {
  return (dispatch) => {
    return axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      console.log('campuses', campuses)
      dispatch(getCampuses(campuses))
    })
  }
}

export const addCampusDb = (campusObj) => {
  return (dispatch) => {
    return axios.post('/api/campuses/addCampus', campusObj)
    .then(res => res.data)
    .then(campus => {
      console.log('campus', campus)
      dispatch(addCampus(campus))
    })
  }
}

export const addStudentDb = (studentObj) => {
  return (dispatch) => {
    return axios.post('/api/students/addStudent', studentObj)
    .then(res => res.data)
    .then(student => {
      dispatch(addStudent(student))
    })
  }
}

export const deleteStudentDb = (studentId) => {
  return (dispatch) => {
    return axios.delete('/api/students/' + studentId)
    .then(() => {
      dispatch(deleteStudent(studentId))
    })
  }

}

export const deleteCampusDb = (campusId) => {
  return (dispatch) => {
    return axios.delete('/api/campuses/' + campusId)
    .then(() => {
      dispatch(deleteCampus(campusId))
    })
    .then(() => {
      dispatch(fetchStudents())
      dispatch(fetchCampuses())
    })
  }

}

export const editStudentDb = (student) => {
  return (dispatch) => {
    return axios.put('/api/students/' + student.id, student)
    .then(() => {
      dispatch(fetchStudents())
    })
  }
}




