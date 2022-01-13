const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const pool = require('../db')
const checkToken = require('../utils/checktoken')
const bodyParser = require('body-parser')
router.post('/api/unfollow/:id',checkToken,async (req,res)=>{
    
           
        try{ //  access granted we have user id now complete the request here
                const user_id = req.user_id
                const following_user_id = req.params.id;
                if(user_id==following_user_id)return  res.send("Invalid Request!")
                const user_exists =( await pool.query("SELECT COUNT(*) FROM users WHERE user_id=$1 ",[following_user_id])).rows[0].count;
                if(user_exists==0) return res.send("Invalid request No such user present");
                const exists = await pool.query("SELECT * FROM follow_list WHERE user_id=$1 AND following_user_id=$2",[user_id,following_user_id]);
                if(!exists || exists.rowCount===0){
                    res.send("Already Not Following");
                }
                else{
                    await pool.query("DELETE FROM follow_list WHERE user_id=$1 AND following_user_id=$2",[user_id,following_user_id]);
                    res.send("Unfollowed!");
                    
                }
       }
       catch(err){
        res.send("Servver Error try again later")
    }

})


module.exports = router;

