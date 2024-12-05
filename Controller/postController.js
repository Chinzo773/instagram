const postModel = require('../Models/postSchema')
const userModel = require('../Models/userSchema')

// This creates posts
const postsCreate = async(req, res) => {
    const { caption, postImg, userId } = req.body

    try{
        const createdPost = await postModel.create({
            caption,
            postImg,
            userId
        })

        const response = await userModel.findByIdAndUpdate(userId, {
            $push: {
                posts: createdPost._id,
            },
        })


        res.send(response)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}


// finds all posts and populates the users info
const posts = async(req, res) => {
    try{
        const posts = await postModel.find().populate({
            path: "comment",
            select: "caption",
            populate: {
                path: "userId",
                select: "username profileImg"
            }
        })

        res.json(posts)
    }catch (err){
        res.send(err)
    }
}


// finds all posts and populates the comments id 
const postsComment = async(req, res) => {


    try{
        const posts = await postModel.find().populate({
            path: "comment",
            select: "caption",
            populate: {
                path: "userId",
                select: "username"
            }
        })

        res.send(posts)
    }catch(err){
        res.send(err)
    }
}




module.exports = { postsCreate, posts, postsComment }