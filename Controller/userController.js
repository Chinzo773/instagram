const userModel = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

// creates new user
const signup = async(req, res) => {
    const { username, password, email, profileImg } = req.body

    try{
        const reso = await userModel.create({
            username: username,
            password: password,
            email: email,
            profileImg: profileImg
        })

        const payload = {
            userId: reso._id,
            username: username
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            message: 'User created successfully!',
            token: token
        });

    }catch(err){
        res.send(err)
    } 

    
}


// finds the email and sends info of it
const login = async(req, res) => {
    const {email, password} = req.body


    try{
        const user = await userModel.findOne({email: email})
        .populate("posts", "caption postImg")
        .populate("followers", "username")

        if(!user){
            return res.status(400).json({ message: 'User not found' });
        }

        if(user.password != password){
            return res.status(400).send('Password invalid')
        }

        const payload = {
            userId: user._id,
            username: user.username
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.send(token)
    }catch(err){
        res.send(err)
    }
}


// finds all users and populates their posts 
const userPosts = async(req, res) => {

    try{
        const posts = await userModel.find().populate("posts", "caption")

        console.log({posts})

        res.send(posts)
    }catch (err){
        res.send(err)
    }
}


// follows followId with userId
const follow = async(req, res) => {
    const { userId, followId } = req.body

    if(userId == followId){
        return res.send('cant folow ur own shit dumass pumpkin')
    }

    try{
        const followed = await userModel.findByIdAndUpdate(followId, {
            $addToSet: {
                followers: userId,
            },
        }, {new: true})

        const following = await userModel.findByIdAndUpdate(userId, {
            $addToSet: {
                following: followId
            }
        }, { new: true })

        res.send(followed + following)
    }catch (err){
        console.log(err)
    }
}


// unfollows unfollowId with userId
const unfollow = async(req, res) => {
    const {userId, unfollowId} = req.body

    if(userId == unfollowId){
        return res.send('cant unfolow ur own shit dumass pumpkin')
    }

    try{
        const unfollow = await userModel.findByIdAndUpdate(userId, {
            $pull: {
                following: unfollowId
            }
        }, { new: true })

        const unfollowed = await userModel.findByIdAndUpdate(unfollowId, {
            $pull: {
                followers: userId
            }
        }, { new: true })  

        res.send(unfollowed + unfollow)
    }catch(err){
        res.send(err)
    }
}

module.exports = { signup, login, userPosts, follow, unfollow }