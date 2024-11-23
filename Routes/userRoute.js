const { Router } = require('express')
const { signup, login, userPosts, follow, unfollow } = require('../Controller/userController')

const userModel = require("../Models/userSchema")
const userRoute = Router()

const validateEmail = async(req, res, next) => {
    const userData = req.body
    const user = await userModel.findOne({ email: userData.email})

    if(!user){
        next()
    }else{
        res.send("email exists")
    }
}

userRoute.post('/signup', validateEmail, signup)

userRoute.get('/login', login)

userRoute.get('/user/posts', userPosts)

userRoute.post('/user/follow', follow)

userRoute.delete('/user/unfollow', unfollow)

module.exports = userRoute