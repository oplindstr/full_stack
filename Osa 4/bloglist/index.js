const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/logins')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const tokenExtractor = (request, response, next) => {
  if (request) {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    else {
        request.token = null
    }
  }
  next()
}

mongoose
  .connect(config.mongoUrl)
  .then( () => { 
    console.log('connected to database', config.mongoUrl) 
  })
  .catch( err => { 
    console.log(err) 
  })  

mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())

app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}