const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   body: {
      type: String
   },
   username: {
      type: String,
      required: true
   },
   created: {
      type: Date,
      default: new Date()
   },
   answers: [
      {
         type: Schema.Types.ObjectId,
         ref: 'answer'
      }
   ]
})

module.exports = mongoose.model('question', QuestionSchema)
