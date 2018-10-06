const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const routes = require('../routes')
const app = next({ dev })
const handle = routes.getRequestHandler(app)

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const image = require('./routes/image')
const image360 = require('./routes/image360')
const instructor = require('./routes/instructor')
const admin = require('./routes/admin')
const lesson = require('./routes/lesson')

app.prepare().then(() => {
   const server = express()

   // Body Parser
   server.use(bodyParser.json({ limit: '10mb' }))
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
   server.use(image)
   server.use(image360)
   server.use(instructor)
   server.use(admin)
   server.use(lesson)

   server.get('/panorama/:id', (req, res) => {
      res.render('panorama', { img: req.params.id })
   })

   server.get('/panorama/:id/:height', (req, res) => {
      res.render('google', { id: req.params.id, height: req.params.height })
   })

   server.use(handle).listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
   })
})
