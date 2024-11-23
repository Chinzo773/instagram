const { Router } = require('express')
const { comment } = require("../Controller/commentController")

const commentRoute = Router()

commentRoute.post('/comment', comment)


module.exports = commentRoute 