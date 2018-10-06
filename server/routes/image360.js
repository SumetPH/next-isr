const router = require('express').Router()
const Image360 = require('../models/Image360')
const imgur = require('imgur')
imgur.setCredentials('mernstack.isr@gmail.com', 'isr605222', 'b103b8577a84886')

// get all images
router.get('/api/image360/all', (req, res) => {
   Image360.find().exec((err, images) => {
      if (err) {
         return res.json({
            msg: 'Error',
            err: err
         })
      }
      res.json({
         msg: 'Success',
         res: images
      })
   })
})

// upload image
router.post('/api/image360/upload', (req, res) => {
   const { filename, img } = req.body
   if (filename === '' || img === '') return res.json({ msg: 'Error' })
   const index = img.base64.indexOf(',') + 1
   const base64 = img.base64.substr(index)
   imgur.uploadBase64(base64).then(json => {
      console.log(json.data)
      const newImage360 = new Image360({
         filename: filename,
         deletehash: json.data.deletehash,
         src: json.data.link
      })

      newImage360.save(err => {
         if (err) {
            return res.json({ msg: 'Upload file to Database error.' })
         }
         res.json({ msg: 'Upload success.' })
      })
   })
})

// delete image
router.delete('/api/image360/delete/:id', (req, res) => {
   const { id } = req.params
   Image360.findById(id).exec((err, image) => {
      if (err) {
         return res.json({ msg: 'Not found image.' })
      }
      imgur.deleteImage(image.deletehash).then(status => {
         console.log(status)
         if (!status.success) {
            return res.json({ msg: 'Error' })
         }
         image.remove(err => {
            if (err) {
               return res.json({ msg: 'Error' })
            }
            res.json({ msg: 'Deleted' })
         })
      })
   })
})

module.exports = router
