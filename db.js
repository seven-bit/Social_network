require('dotenv').config();
const Pool = require("pg").Pool;
const connectionString = process.env.DB_URI;

const pool = new Pool({
    connectionString,
    ssl:{
        rejectUnauthorized: false,
    }
});
pool.connect((err)=>{
    if(err) return console.log(err);

    console.log("DB connected")
})
module.exports = pool;