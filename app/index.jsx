'use strict'
import React from 'react'
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom';
import Campuses from './components/CampusList.jsx';
import Students from './components/StudentList.jsx'
import store from './store'
import Navbar from './components/navbar.jsx';
import Main from './components/main.jsx';

// const unsubscribe = store.subscribe(function () {
//   console.log('----------------');
//   console.log('State changed!!', store.getState());
// });

// unsubscribe();


ReactDOM.render (
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('main')
)
