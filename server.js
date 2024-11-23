const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./Routes/userRoute.js')
const postRoute = require('./Routes/postRoute.js')
const commentRoute = require('./Routes/commentRoute.js')
const likeRoute = require('./Routes/likeRoute.js')
dotenv.config()

const app = express()
const port = 8080

const connectDatabase = async() => {
    const res = await mongoose.connect(process.env.MONGODB_URI)

    if (res) console.log("db connected")
}

connectDatabase()

app.use(express.json())

app.use(userRoute);

app.use(postRoute)

app.use(commentRoute)

app.use(likeRoute)



app.listen(port, () => {
    console.log(`your backend server is running on ${port}`)
})