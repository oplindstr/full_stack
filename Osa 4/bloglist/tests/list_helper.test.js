const listHelper = require('../utils/list_helper')
const testHelper = require('../utils/test_helper')

describe.skip('list helpers', async () => {

  test('dummy is called', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  describe('total likes', () => {

    const listWithOneBlog = testHelper.listWithOneBlog
    const blogs = testHelper.initialBlogs
    const listWithZeroBlogs = testHelper.listWithZeroBlogs

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has multiple blogs equals the likes of their sum', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(34)
    })

    test('when list is empty equals zero', () => {
      const result = listHelper.totalLikes(listWithZeroBlogs)
      expect(result).toBe(0)
    })
  })

  describe('favorite blog', () => {

    const listWithOneBlog = testHelper.listWithOneBlog
    const blogs = testHelper.initialBlogs
    const listWithZeroBlogs = testHelper.listWithZeroBlogs

    test('when list has only one blog equals that one', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual(  
        {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          likes: 5
        }
      )
    })

    test('when list has multiple blogs equals favorite', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual(  
        {
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          likes: 12
        }
      )
    })

    test('when list is empty equals null', () => {
      const result = listHelper.favoriteBlog(listWithZeroBlogs)
      expect(result).toEqual(null)
    })
  })

  describe('most blogs', () => {

    const listWithOneBlog = testHelper.listWithOneBlog
    const blogs = testHelper.initialBlogs
    const listWithZeroBlogs = testHelper.listWithZeroBlogs

    test('when list has only one equals its author and has one', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual(  
        {
          author: 'Edsger W. Dijkstra',
          blogs: 1
        }
      )
    })

    test('when list has multiple blogs and bloggers equals most active blogger', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual(  
        {
          author: "Edsger W. Dijkstra",
          blogs: 2
        }
      )
    })

    test('when list is empty equals null', () => {
      const result = listHelper.mostBlogs(listWithZeroBlogs)
      expect(result).toEqual(null)
    })
  })

  describe('most votes', () => {

    const listWithOneBlog = testHelper.listWithOneBlog
    const blogs = testHelper.initialBlogs
    const listWithZeroBlogs = testHelper.listWithZeroBlogs

    test('when list has only one equals its author and its likes', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual(  
        {
          author: 'Edsger W. Dijkstra',
          votes: 5
        }
      )
    })

    test('when list has multiple blogs and bloggers equals most liked blogger', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual(  
        {
          author: "Edsger W. Dijkstra",
          votes: 17
        }
      )
    })

    test('when list is empty equals null', () => {
      const result = listHelper.mostLikes(listWithZeroBlogs)
      expect(result).toEqual(null)
    })
  })
})