const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const pool = require('../db')
const checkToken = require('../utils/checktoken')

router.get('/api/all_posts',checkToken,async (req,res)=>{
            
        try{//  access granted we have user id now complete the request here
            const user_id = req.user_id;
            
            
            const posts = await pool.query("SELECT * FROM posts order by created_at desc")
            const no_of_posts = posts.rowCount;
            let ret = []
            for(var i=0;i<no_of_posts;i++){
                    var post = posts.rows[i];
                    let comments = [];
                    const cmnt = await pool.query("SELECT (comment) FROM comments WHERE post_id=$1",[post.post_id]);
                    const comment_count =  cmnt.rowCount
                    for(let j=0;j<comment_count;j++){
                        comments.push(cmnt.rows[j].comment);
                    }
                    const no_of_likes = (await pool.query("SELECT COUNT(*) FROM likes WHERE post_id = $1",[post.post_id])).rows[0].count;
                    const cur_post = {
                        post_id: post.post_id,
                        title: post.title,
                        description: post.description,
                        created_at: post.created_at,
                        comments: comments,
                        likes: no_of_likes
                    };
                    ret.push(cur_post);
            }
            res.send(ret);
        }
        catch(err){
            res.send("Servver Error try again later")
        }
})


module.exports = router;

