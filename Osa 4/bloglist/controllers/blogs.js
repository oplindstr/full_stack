const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user,
    comments: blog.comments
  }
}

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map(formatBlog))
  })

  blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(formatBlog(blog))
  })
  
  blogsRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)

    try {

      if (!blog.likes) {
        blog.likes = 0
      }

      if (!blog.title) {
        return response.status(400).json({error: 'title missing'})
      }

      if (!blog.url) {
        return response.status(400).json({error: 'url missing'})
      }

      const token = request.token
      const decodedToken = jwt.verify(token, process.env.SECRET)

      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

      const user = await User.findById(decodedToken.id)

      blog.user = user._id
    
      const result = await blog.save()

      response.status(201).json(result)
    } catch(exception) {
      if (exception.name === 'JsonWebTokenError' ) {
        response.status(401).json({ error: exception.message })
      } else {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
      }
    }
  })

  blogsRouter.delete('/:id', async (request, response) => {
    try {

      const token = request.token
      const decodedToken = jwt.verify(token, process.env.SECRET)

      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

      const loggedInUser = await User.findById(decodedToken.id)

      if (!loggedInUser) {
        return response.status(401).json({ error: 'you have to log in to delete' })
      }

      const blog = await Blog.findById(request.params.id)

      if (blog.user && loggedInUser.id.toString() !== blog.user.toString()) {
        return response.status(401).json({ error: 'incorrect user' })
      }

      await Blog.findByIdAndRemove(request.params.id)
  
      response.status(204).end()
    } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: exception.message })
    }
  })

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true } )

      response.json(formatBlog(updatedBlog))
    } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'error' })
    }
  })

  blogsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body

    const comment = body.comment

    const blog = await Blog.findById(request.params.id)

    let updatedBlog = blog

    blog.comments.push(comment)

    try {
      updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true } )

      response.json(formatBlog(updatedBlog))
    } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'error' })
    }
  })

module.exports = blogsRouter