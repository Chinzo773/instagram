const { unlike, like, coutLike } = require('../Controller/likeController')
const Router = require('express')

const likeRoute = Router()

likeRoute.post('/like', like)

likeRoute.post('/unlike', unlike)

likeRoute.get('/seeLikes', coutLike)


module.exports = likeRoute