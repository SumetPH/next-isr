const router = require('express').Router()
const Instructor = require('../models/Instructor')

// get
router.get('/api/instructor/all', (req, res) => {
   Instructor.find().exec((err, instructors) => {
      res.json({ msg: 'Success', instructors })
   })
})

// post
router.post('/api/instructor/post', (req, res) => {
   const { name, sex, position, email, phone } = req.body
   const newInstructor = new Instructor({
      name,
      sex,
      position,
      email,
      phone
   })

   newInstructor.save(err => {
      if (err) {
         return res.json({ msg: 'Error' })
      }

      res.json({ msg: 'Success' })
   })
})

// update lesson
router.put('/api/instructor/update', (req, res) => {
   const { _id, name, sex, position, email, phone } = req.body
   Instructor.findByIdAndUpdate(_id, {
      name,
      sex,
      position,
      email,
      phone
   }).exec((err, result) => {
      if (err) return res.json({ msg: 'Error', err })
      res.json({ msg: 'Success', result })
   })
})

// delete
router.delete('/api/instructor/delete', (req, res) => {
   const { _id } = req.body
   Instructor.findByIdAndRemove(_id).exec((err, result) => {
      if (err) return res.json({ msg: 'Error', err })
      res.json({ msg: 'Success', result })
   })
})
module.exports = router
