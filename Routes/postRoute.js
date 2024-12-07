const { Router } = require('express')
const { postsCreate, posts, postsComment } = require('../Controller/postController')
const { query } = require('querystring')


const postRoute = Router()



postRoute.get('/posts', posts)

postRoute.post('/posts/create', postsCreate)

postRoute.get('/posts/:postId', postsComment)



module.exports = postRoute