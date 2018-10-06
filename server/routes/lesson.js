const router = require('express').Router()
const Lesson = require('../models/Lesson')

// get lessons
router.get('/api/lesson/all', (req, res) => {
   Lesson.find().exec((err, lesson) => {
      if (err) return res.json({ msg: 'Error', err })
      res.json({ msg: 'Success', lesson })
   })
})

// add lesson
router.post('/api/lesson/add', (req, res) => {
   const { number, title, value } = req.body
   const newLesson = new Lesson({ number, title, value })
   newLesson.save(err => {
      if (err) return res.json({ msg: 'Error', err })
      res.json({ msg: 'Success' })
   })
})

// update lesson
router.put('/api/lesson/update', (req, res) => {
   const { _id, number, title, value } = req.body
   Lesson.findByIdAndUpdate(_id, { number, title, value }).exec(
      (err, result) => {
         if (err) return res.json({ msg: 'Error', err })
         res.json({ msg: 'Success', result })
      }
   )
})

// delete lesson
router.delete('/api/lesson/delete', (req, res) => {
   const { _id } = req.body
   Lesson.findByIdAndRemove(_id).exec((err, result) => {
      if (err) res.json({ msg: 'Error', err })
      res.json({ msg: 'Success', result })
   })
})

module.exports = router
