const api = require('express').Router()
const {Student} = require('../../db/models')


api.get('/', (req,res,next) => {
  Student.findAll()
  .then(students => res.json(students))
  .catch(next)
})

api.get('/:studentId', (req,res,next) =>{
  Student.findOne({
    where: {
      id: req.params.studentId
    }
  })
  .then(student => res.json(student))
  .catch(next)

})

api.post('/addStudent', (req, res, next) =>{
  Student.create(req.body)
  .then(student => res.json(student))
  .catch(next((new Error ('Duplicate'))))


})

api.put('/:studentId', (req,res,next) => {
  Student.findOne({
    where: {
      id: req.params.studentId
    }
  })
  .then(student => student.update(req.body))
  .catch(next)
})


api.delete('/:studentId', (req,res,next) =>{
  Student.destroy({
    where: {
      id: req.params.studentId
    }
  })
  .then(() => res.status(204).end())
  .catch(next);

})


module.exports = api;
