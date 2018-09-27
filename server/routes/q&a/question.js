const router = require('express').Router()
const Question = require('../../models/Question')
const Answer = require('../../models/Answer')

// get all questions
router.get('/api/question/all', (req, res) => {
   Question.find()
      .populate('answers')
      .exec((err, questions) => {
         res.json({
            msg: 'Success',
            questions
         })
      })
})

// get question by id
router.post('/api/question/id', (req, res) => {
   const { questionId } = req.body
   Question.findById(questionId)
      .populate('answers')
      .exec((err, question) => {
         if (err || question === null) {
            return res.json({ msg: 'Error', res: err })
         }
         res.json({
            msg: 'Success',
            question
         })
      })
})

// create post
router.post('/api/question/create', (req, res) => {
   const { title, body, username, created } = req.body
   const newQuestion = new Question({
      title,
      body,
      username,
      created
   })

   newQuestion.save(err => {
      if (err) {
         return res.json({
            msg: 'Error',
            res: err
         })
      }

      res.json({ msg: 'Success' })
   })
})

// delete post
router.delete('/api/question/delete', (req, res) => {
   const { questionId } = req.body
   Question.findByIdAndRemove(questionId).exec(err => {
      if (err) {
         return res.json({
            msg: 'Error',
            res: err
         })
      }
      res.json({ msg: 'Success' })
   })
})

module.exports = router
