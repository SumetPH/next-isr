const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const question = require('./routes/question')
const image = require('./routes/image')
const image360 = require('./routes/image360')
const instructor = require('./routes/instructor')
const user = require('./routes/user')
const admin = require('./routes/admin')

app.prepare().then(() => {
   const server = express()

   // Body Parser
   server.use(bodyParser.json({ limit: '5mb' }))
   server.use(bodyParser.urlencoded({ extended: false }))

   // Engine template
   server.set('view engine', 'ejs')

   // MongoDB
   const mongodbUrl = require('./config/keys').mongodbUrl
   mongoose
      .connect(
         mongodbUrl,
         { useNewUrlParser: true }
      )
      .then(() => console.log('mongodb connected.'))

   // Route
   server.use(question)
   server.use(image)
   server.use(image360)
   server.use(instructor)
   server.use(user)
   server.use(admin)

   server.get('/question/:id', (req, res) => {
      return app.render(req, res, '/questions/question', { id: req.params.id })
   })

   server.get('/panorama/:id', (req, res) => {
      res.render('panorama', { img: req.params.id })
   })
   server.get('*', (req, res) => {
      return handle(req, res)
   })

   server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
   })
})
