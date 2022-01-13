const jwt = require("jsonwebtoken")
const checkToken = async (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {

        const bearer = header.split(' ');
        const token = bearer[1];

        await jwt.verify(token, process.env.TOKEN_KEY , async (err, data) => {

            if(err){
                // If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.status(403).send("access denied!!");
            } 
            else{
                //  access granted we have user id now complete the request here
                req.user_id = data.user_id;
                next();        
            }
        })
  
    } else {
        //If header is undefined return Forbidden (403)
        res.status(403).send("Unautherised Access, Access denied!")
    }

    


}

module.exports = checkToken ;