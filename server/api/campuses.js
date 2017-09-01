'use strict'
const api = require('express').Router()
const {Campus} = require('../../db/models')

api.get('/', (req,res,next) => {
  Campus.findAll()
  .then(campuses => res.json(campuses))
  .catch(next)
})

api.get('/:campusId', (req,res,next) =>{
  Campus.findOne({
    where: {
      id: req.params.campusId
    }
  })
  .then(campus => res.json(campus))
  .catch(next)

})

api.post('/addCampus', (req,res,next) => {

  Campus.create(req.body)
  .then(newCampus => res.json(newCampus))
  .catch((err) => {
    res.send(err.errors[0].message)
  })
})


api.put('/:campusId', (req,res,next) => {
  Campus.findOne({
    where: {
      id: req.params.campusId
    }
  })
  .then(campus => campus.update(req.body))
  .then(() => res.status(204).end())
  .catch(next)
})

api.delete('/:campusId', (req,res,next) =>{
  Campus.destroy({
    where: {
      id: req.params.campusId
    }
  })
  .then(() => res.status(204).end())
  .catch(next)
})

module.exports = api;
