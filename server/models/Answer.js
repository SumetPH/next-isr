const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
   // questionId: {
   //    type: String,
   //    required: true
   // },
   body: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true
   },
   created: {
      type: Date,
      default: new Date()
   },
   question: {
      type: Schema.Types.ObjectId,
      ref: 'question'
   }
})

module.exports = mongoose.model('answer', answerSchema)
