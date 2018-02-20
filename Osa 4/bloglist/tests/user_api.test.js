const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { usersInDb } = require('../utils/test_helper')

describe('dont add invalid users', async () => {

  beforeAll(async () => {
    await User.remove({})
  })

  test('POST /api/users fails with too short password', async () => {

    const newUser = {
      username: 'optest',
      name: 'Olli-Pekka Lindström',
      password: 'se'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('POST /api/users fails with taken username', async () => {

    const validUser = {
      username: 'optest',
      name: 'Olli-Pekka Lindström',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(validUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const takenUser = {
        username: 'optest',
        name: 'Olli-Pekka Lindström2',
        password: 'secret2'
      }

      await api
      .post('/api/users')
      .send(takenUser)
      .expect(400)

  })
})