const router = require('express').Router()
const Professor = require('../models/professor')

// get
router.get('/api/professor/all', (req, res) => {
   Professor.find().exec((err, data) => {
      res.json({ msg: 'Success', res: data })
   })
})

// post
router.post('/api/professor/post', (req, res) => {
   const { firstname, lastname } = req.body
   const newProfessor = new Professor({
      firstname,
      lastname
   })

   newProfessor.save(err => {
      if (err) {
         return res.json({ msg: 'Error' })
      }

      res.json({ msg: 'Success' })
   })
})

// delete
router.delete('/api/professor/delete', (req, res) => {
   const { _id } = req.body
   Professor.findByIdAndRemove(_id).exec(err => {
      if (err) {
         return res.json({ msg: 'Error' })
      }
      res.json({ msg: 'Deleted' })
   })
})
module.exports = router
