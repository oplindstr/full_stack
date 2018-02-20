const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelper = require('../utils/test_helper')

describe.skip('blog api tests', () => {

  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = testHelper.initialBlogs.map(n => new Blog(n))
    await Promise.all(blogObjects.map(n => n.save()))
  })

    test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there is correct amount of blogs', async () => {
        const response = await api
        .get('/api/blogs')

        expect(response.body.length).toBe(testHelper.initialBlogs.length)
    })

    test('blog can be added ', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5
            }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })

    test('adding blogs add to the total amount', async () => {

        let response = await api
        .get('/api/blogs')

        let initialLength = response.body.length

        const newBlog = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
    
        response = await api
        .get('/api/blogs')
    
        expect(response.body.length).toBe(initialLength + 1)
    })

    test('blogs contain added blog after adding', async () => {
        const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
    
        const response = await api
        .get('/api/blogs')
    
        const titles = response.body.map(r => r.title)
    
        expect(titles).toContain('TDD harms architecture')
    })

    test('added blog has likes 0 if missing', async () => {
        const newBlog = {
        title: "test",
        author: "test",
        url: "test",
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
    
        const response = await api
        .get('/api/blogs')

        expect(response.body.pop().likes).toBe(0)
    })

    test('added blog must have title', async () => {
        const newBlog = {
        author: "test2",
        url: "test2"
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('added blog must have url', async () => {
        const newBlog = {
        author: "test3",
        title: "test3"
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    afterAll(() => {
    server.close()
    })

    test('a blog can be deleted', async () => {
        const newBlog = {
            title: "Delete test",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0
        }
    
        const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
    
        const blogsAtBeginning = await api
        .get('/api/blogs')
      
        await api
          .delete(`/api/blogs/${addedBlog.body._id}`)
          .expect(204)
      
        const blogsAfterDelete = await api
          .get('/api/blogs')
      
        const titles = blogsAfterDelete.body.map(r => r.title)
      
        expect(titles).not.toContain("Delete test")
        expect(blogsAfterDelete.body.length).toBe(blogsAtBeginning.body.length - 1)
      })

})