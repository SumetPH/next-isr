const router = require('express').Router()
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
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

// send confirm email
router.post('/api/user/register', (req, res) => {
   const { email, username, password } = req.body
   const token = jwt.sign({ email, username, password }, 'mernstack-isr')
   nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: 'mernstack.isr@gmail.com', // generated ethereal user
            pass: 'isr605222' // generated ethereal password
         }
      })

      // setup email data with unicode symbols
      let mailOptions = {
         from: '<mernstack-isr@no-reply.com>',
         to: req.body.email,
         subject: 'Register Verify',
         text: `Please confirm your account by clicking the following link : http://mernstack-isr.herokuapp.com/api/user/register/${token}`,
         html: `<b>Please confirm your account by clicking the following link : <a href='http://mernstack-isr.herokuapp.com/api/user/register/${token}'>Click Here</a></b>`
      }

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (err, info) => {
         if (err) {
            return res.json({ msg: 'Error', err })
         }
         res.json({ msg: 'Success', info })
      })
   })
})

// register user
router.get('/api/user/register/:token', (req, res) => {
   const { token } = req.params
   const decode = jwt.decode(token)
   const { email, username, password } = decode
   User.findOne({ email }).exec((err, doc) => {
      if (doc) {
         return res.send('การยืนยันไม่สำเร็จ มีข้อมูููููลในระบบแล้ว')
      }

      const newUser = new User({ email, username, password })
      newUser.save(err => {
         if (err) {
            return res.send('การยืนยันไม่สำเร็จ')
         }
         return res.send('การยืนยันสำเร็จ')
      })
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
         username: doc.username
      })
   })
})

module.exports = router
