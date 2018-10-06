const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LessonSchema = new Schema({
   number: {
      type: String,
      required: true
   },
   title: {
      type: String,
      required: true
   },
   value: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model('lesson', LessonSchema)
