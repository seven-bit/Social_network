const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const pool = require('../db')
const checkToken = require('../utils/checktoken')

router.get('/api/posts/:id',checkToken,async (req,res)=>{
            
        try{//  access granted we have user id now complete the request here
            const user_id = req.user_id;
            const post_id = req.params.id;
            const post_valid = (await pool.query("SELECT COUNT(*) FROM posts WHERE post_id=$1",[post_id])).rows[0].count;
            if(post_valid==0)return res.send("Invalid post id");
            
            const likes = (await pool.query("SELECT COUNT(*) FROM likes WHERE post_id = $1",[post_id])).rows[0].count;
            const comments = (await pool.query("SELECT COUNT(*) FROM comments WHERE post_id = $1",[post_id])).rows[0].count;
            res.json({likes: likes, comments: comments})
        }
        catch(err){
            res.send("Servver Error try again later")
        }
})


module.exports = router;

