const { Router } = require('express')
const { postsCreate, posts, postsComment } = require('../Controller/postController')


const postRoute = Router()



postRoute.get('/posts', posts)

postRoute.post('/posts/create', postsCreate)

postRoute.get('/posts/comment', postsComment)



module.exports = postRoute