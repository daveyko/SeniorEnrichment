'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        arg: true,
        msg: 'Please enter a first name'
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        arg: true,
        msg: 'Please enter a last name'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        arg: true,
        msg: 'Please enter a valid email'
  }}
},
  image: {
    type: Sequelize.STRING
    }
})

