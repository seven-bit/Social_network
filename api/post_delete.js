const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const pool = require('../db')
const checkToken = require('../utils/checktoken')
const bodyParser = require('body-parser')
router.delete('/api/posts/:id',checkToken,async (req,res)=>{
    
        try{ //  access granted we have user id now complete the request here
                const user_id = req.user_id;
                const post_id = req.params.id;
                const exists = (await pool.query("SELECT COUNT(*) FROM posts WHERE post_id = $1",[post_id])).rows[0].count;
                if(exists==0)return res.send("Post Does not exists!!");

                await pool.query("DELETE FROM posts WHERE post_id=$1",[post_id])
                res.send("Deleted");
        }
        catch(err){
            res.send("Servver Error try again later")
        }
})


module.exports = router;

