const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const formatUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult
  }
}

usersRouter.get('', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(formatUser))
  })

usersRouter.post('/', async (request, response) => {
    try {
      const body = request.body

      const existingUser = await User.findOne({ username: body.username })

      if (body.password.length < 3) {
        response.status(400).json({ error: 'Password must be at least 3 characters long' })
      }
      else if (existingUser) {
        response.status(400).json({ error: 'Username has been taken' })
      }
      else {
  
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const adult = 1

        if (body.adult) {
            adult = body.adult
        }
    
        const user = new User({
            username: body.username,
            name: body.name,
            adult: adult,
            passwordHash
        })
    
        const savedUser = await user.save()
    
        response.json(formatUser(savedUser))
      }
    } catch (exception) {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  })

module.exports = usersRouter