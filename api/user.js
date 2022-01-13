const express = require('express')
const router = express.Router()
const pool = require('../db')
const checkToken = require('../utils/checktoken')

router.get('/api/user',checkToken,async (req,res)=>{
    try{
            //  access granted we have user id now complete the request here
            const user_id = req.user_id;
            const user_name = await pool.query("SELECT (user_name) FROM users WHERE user_id = $1",[user_id]);
            const following =await pool.query("SELECT COUNT(*) FROM follow_list WHERE user_id=$1",[user_id]);
            const followers =await pool.query("SELECT COUNT(*) FROM follow_list WHERE following_user_id=$1",[user_id]);
            console.log(user_name.rows[0].user_name)
            console.log(following.rows[0].count)
            console.log(followers.rows[0].count)      
            res.json({user_name:user_name.rows[0].user_name, following: following.rows[0].count, followers: followers.rows[0].count});   
    }
    catch(err){
        res.send("Servver Error try again later")
    }
            
                   
        


})


module.exports = router;

