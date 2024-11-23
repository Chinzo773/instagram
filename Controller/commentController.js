const commentModel = require('../Models/commentsSchema')
const postModel = require('../Models/postSchema')

const comment = async(req, res) => {
    const { userId, comment, postId } = req.body

    try{
        const createdComment = await commentModel.create({
            userId,
            comment,
            postId
        })

        const response = await postModel.findByIdAndUpdate(postId, {
            $push: {
                comment: createdComment._id
            }
        })
        

        res.send(response)
    }catch(err){
        res.send(err)
    }
}

module.exports = { comment }