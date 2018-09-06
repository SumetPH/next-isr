const router = require('express').Router()
const User = require('../models/User')

// get all user
router.get('/api/user', (req, res) => {
   User.find().exec((err, doc) => {
      if (err) {
         return res.json({ msg: 'Error', err: err })
      }
      return res.json({ msg: 'Success', doc: doc })
   })
})

// delete user by id
router.delete('/api/user', (req, res) => {
   const { id } = req.body
   User.findByIdAndRemove(id).exec(err => {
      if (err) {
         return res.json({ msg: 'Error', err: err })
      }
      return res.json({ msg: 'Success' })
   })
})

// register user
router.post('/api/user/register', (req, res) => {
   const { email, username, password } = req.body
   const newUser = new User({ email, username, password })
   newUser.save(err => {
      if (err) {
         return res.json({ msg: 'Error', err: err })
      }
      return res.json({ msg: 'Success' })
   })
})

// login user
router.post('/api/user/login', (req, res) => {
   const { email, password } = req.body
   User.findOne({ email, password }).exec((err, doc) => {
      if (err || doc === null) {
         return res.json({ msg: 'Error', status: false })
      }
      return res.json({
         msg: 'Success',
         status: true,
         doc: { email: doc.email, user: doc.user }
      })
   })
})

module.exports = router
