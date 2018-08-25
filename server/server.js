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

   server.post('/api/login', (req, res) => {
      const { username, password } = req.body
      if (username === 'admin' && password === 'admin') {
         return res.json({ msg: 'success' })
      }
      res.json({ msg: 'error' })
   })

   server.get('/question/:id', (req, res) => {
      return app.render(req, res, '/questions/question', { id: req.params.id })
   })

   server.get('*', (req, res) => {
      return handle(req, res)
   })

   server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
   })
})
