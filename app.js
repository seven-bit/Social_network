// config dotenc for use
require('dotenv').config()

// initialize express
const express = require('express')
const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())






const authentication = require('./api/authenticate.js');
const follow = require('./api/follow.js');
const unfollow = require('./api/unfollow.js');
const user = require('./api/user');
const post_upload = require('./api/post_upload');
const post_delete = require('./api/post_delete');
const like = require("./api/like")
const unlike = require("./api/unlike")
const comment = require("./api/comment")
const post_detail = require("./api/post_detail")
const all_posts = require('./api/all_posts')
app.use(authentication);
app.use(follow)
app.use(unfollow)
app.use(user)
app.use(post_upload)
app.use(post_delete)
app.use(like)
app.use(unlike)
app.use(comment)
app.use(post_detail)
app.use(all_posts)

const PORT = process.env.PORT || 6000 ;
app.listen(PORT,()=>{
    console.log(`server up and running at ${PORT} `)
})