const router = require('express').Router()
const Answer = require('../models/Answer')
const Question = require('../models/Question')

// get answers
router.get('/api/answer/all', (req, res) => {
   Answer.find()
      .populate('question')
      .exec((err, doc) => {
         res.json({ msg: 'Success', res: doc })
      })
})

// create answer
router.post('/api/answer/create', (req, res) => {
   const { questionId, body, username, created } = req.body
   Question.findById(questionId).exec((err, question) => {
      const newAnswer = new Answer({ question, body, username, created })
      newAnswer.save(err => {
         if (err) {
            return res.json({ msg: 'Error', err })
         }
         question.answers.push(newAnswer)
         question.save(err => {
            if (err) {
               return res.json({ msg: 'Error', err })
            }
            res.json({ msg: 'Success' })
         })
      })
   })
})

// delete answer
router.delete('/api/answer/delete', (req, res) => {
   const { answerId } = req.body
   Answer.findByIdAndRemove(answerId).exec(err => {
      if (err) {
         return res.json({ msg: 'Error', err })
      }
      res.json({ msg: 'Success' })
   })
})

module.exports = router
