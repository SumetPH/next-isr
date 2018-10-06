const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image360Schema = new Schema({
   filename: {
      type: String,
      required: true
   },
   deletehash: {
      type: String,
      required: true
   },
   src: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model('image360', Image360Schema)
