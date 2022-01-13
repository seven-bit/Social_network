const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const pool = require('../db')
const checkToken = require('../utils/checktoken')

router.post('/api/posts',checkToken,async (req,res)=>{
            
        try{//  access granted we have user id now complete the request here
            const user_id = req.user_id;
            const title = req.body.title;
            const description = req.body.description;
            
            const timestamp =( await pool.query("SELECT now() at time zone 'utc'")).rows[0].timezone;
            
            const post_id = (await pool.query("INSERT INTO posts(title,description,created_at,user_id) VALUES($1,$2,$3,$4) RETURNING *",[title,description,timestamp,user_id])).rows[0].post_id;
            res.json({ post_id:post_id, title: title, description:description,created_at:timestamp});
        
        }
        catch(err){
            res.send("Servver Error try again later")
        }
})


module.exports = router;

