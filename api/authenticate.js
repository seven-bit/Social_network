const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const pool = require('../db')


router.post('/api/authenticate',async (req,res)=>{
  try {
      const email = req.body.email
      const password = req.body.password
    
      const user = await pool.query("SELECT email,user_id FROM users WHERE email=$1 AND password=$2",[email,password]);

      if(!user || user.rowCount===0)return res.status(400).send("Incorrect credentials!!  Please enter valid details")

      const token = jwt.sign(
          { user_id: user.rows[0].user_id},
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          });



      return res.send(token);
  }
  catch(err){
    res.send("Servver Error try again later")
  }
})

module.exports= router;