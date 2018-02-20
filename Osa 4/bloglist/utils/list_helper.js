const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return blogs.map(blog => blog.likes).reduce(reducer)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
     let favBlog = null
     let favLikes = 0

     blogs.forEach((blog) => {
        if (blog.likes >= favLikes) {
            favLikes = blog.likes
            favBlog = blog
        }
      })
      return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
      }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let frequency = {};

    blogs.map(blog => blog.author).forEach((author) => {
        frequency[author] = 0
      })

    blogs.forEach((blog) => {
        frequency[blog.author]++
      })

    blogs.sort(function(a, b) {
        return frequency[b.author] - frequency[a.author];
    });
      return {
        author: blogs[0].author,
        blogs: frequency[blogs[0].author]
      }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let likes = {};

    blogs.map(blog => blog.author).forEach((author) => {
        likes[author] = 0
      })

    blogs.forEach((blog) => {
        likes[blog.author] += blog.likes
      })

    blogs.sort(function(a, b) {
        return likes[b.author] - likes[a.author];
    });
      return {
        author: blogs[0].author,
        votes: likes[blogs[0].author]
      }
}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }