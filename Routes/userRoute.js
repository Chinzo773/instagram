const { Router } = require('express')
const { signup, login, userPosts, follow, unfollow } = require('../Controller/userController')

const userModel = require("../Models/userSchema")
const userRoute = Router()
const auth = require('../authenticator')

userRoute.post('/signup', auth, signup)

userRoute.get('/login', auth, login)

userRoute.get('/user/posts', auth, userPosts)

userRoute.post('/user/follow', auth, follow)

userRoute.delete('/user/unfollow', auth, unfollow)

module.exports = userRoute