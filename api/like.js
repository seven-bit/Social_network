const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const pool = require('../db')
const checkToken = require('../utils/checktoken')

router.post('/api/like/:id',checkToken,async (req,res)=>{
            
        try{//  access granted we have user id now complete the request here
            const user_id = req.user_id;
            const post_id = req.params.id;
            const post_valid = (await pool.query("SELECT COUNT(*) FROM posts WHERE post_id=$1",[post_id])).rows[0].count;
            if(post_valid==0)return res.send("Invalid post id");
            const already_liked = (await pool.query("SELECT COUNT(*) FROM likes WHERE post_id=$1 AND user_id=$2",[post_id,user_id])).rows[0].count;
            if(already_liked>0)return res.send("Already liked this post");

            await pool.query("INSERT INTO likes(user_id,post_id) VALUES($1,$2)",[user_id,post_id]);
            res.send("liked")
        
        }
        catch(err){
            res.send("Servver Error try again later")
        }
})


module.exports = router;

