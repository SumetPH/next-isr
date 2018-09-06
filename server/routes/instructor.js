const router = require('express').Router()
const Instructor = require('../models/Instructor')

// get
router.get('/api/instructor/all', (req, res) => {
   Instructor.find().exec((err, data) => {
      res.json({ msg: 'Success', res: data })
   })
})

// post
router.post('/api/instructor/post', (req, res) => {
   const { firstname, lastname } = req.body
   const newInstructor = new Instructor({
      firstname,
      lastname
   })

   newInstructor.save(err => {
      if (err) {
         return res.json({ msg: 'Error' })
      }

      res.json({ msg: 'Success' })
   })
})

// delete
router.delete('/api/instructor/delete', (req, res) => {
   const { _id } = req.body
   Instructor.findByIdAndRemove(_id).exec(err => {
      if (err) {
         return res.json({ msg: 'Error' })
      }
      res.json({ msg: 'Deleted' })
   })
})
module.exports = router
