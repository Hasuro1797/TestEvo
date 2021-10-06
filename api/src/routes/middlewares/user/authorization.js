const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const { JWT_SECRET } = process.env;

const authorization = async(req, res, next)=>{
    try {
        const jwtToken = req.headers['authorization'];
        const token = jwtToken.split(" ")[1];

        if(!token) return res.status(403).send({ message : "Authorization denied."});

        const payload = jwt.verify(token, JWT_SECRET);

        req.user = payload.user;
        next();
    } catch (error) {
        return res.status(403).send({ message: "Authorization denied." })
    }
}

module.exports = authorization;