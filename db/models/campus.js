'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    unique: {
      args: true,
      message: 'Campus name must be unique'
    },
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
  }
})
