const router = require('express').Router()
const Admin = require('../models/Admin')

// enable admin
router.get('/api/admin/enable', (req, res) => {
   Admin.find().exec((err, doc) => {
      if (doc.length === 0) {
         const newAdmin = new Admin({
            username: 'admin',
            password: 'admin'
         })

         newAdmin.save(err => {
            if (err) {
               return res.json({ msg: 'Error', err })
            }
            return res.json({ msg: 'Success' })
         })
      } else {
         return res.json({ msg: 'Admin has enabled.' })
      }
   })
})

// login
router.post('/api/admin/login', (req, res) => {
   const { username, password } = req.body
   Admin.findOne({ username, password }).exec((err, doc) => {
      if (err || doc === null) {
         return res.json({ msg: 'Error', err })
      }
      return res.json({ msg: 'Success' })
   })
})

// change username
router.post('/api/admin/change-username', (req, res) => {
   const { oldPassword, newUsername } = req.body
   Admin.findOne({ password: oldPassword }).exec((err, doc) => {
      if (err || doc === null) {
         return res.json({ msg: 'Error', err })
      }

      doc.username = newUsername
      doc.save(err => {
         if (err) {
            return res.json({ msg: 'Error', err })
         }
         return res.json({ msg: 'Success' })
      })
   })
})

// change password
router.post('/api/admin/change-password', (req, res) => {
   const { oldPassword, newPassword } = req.body
   Admin.findOne({ password: oldPassword }).exec((err, doc) => {
      if (err || doc === null) {
         return res.json({ msg: 'Error', err })
      }

      doc.password = newPassword
      doc.save(err => {
         if (err) {
            return res.json({ msg: 'Error', err })
         }
         return res.json({ msg: 'Success' })
      })
   })
})

module.exports = router
