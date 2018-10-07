const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InstructorSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   sex: String,
   position: String,
   email: String,
   phone: String
})

module.exports = mongoose.model('instructor', InstructorSchema)
