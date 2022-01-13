const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const pool = require('../db')
const checkToken = require('../utils/checktoken')

router.post('/api/comment/:id',checkToken,async (req,res)=>{
            
        try{//  access granted we have user id now complete the request here
            const user_id = req.user_id;
            const post_id = req.params.id;
            const comment = req.body.comment;
            const post_valid = (await pool.query("SELECT COUNT(*) FROM posts WHERE post_id=$1",[post_id])).rows[0].count;
            if(post_valid==0)return res.send("Invalid post id");
            
            const comment_id = (await pool.query("INSERT INTO comments(comment,post_id,user_id) VALUES($1,$2,$3) RETURNING *",[comment,post_id,user_id])).rows[0].comment_id;
            res.json({comment_id: comment_id});
        }
        catch(err){
            res.send("Servver Error try again later")
        }
})


module.exports = router;

