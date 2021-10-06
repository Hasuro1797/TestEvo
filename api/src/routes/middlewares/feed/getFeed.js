const { Feed } = require('../../../db.js');

const getFeed = async(req,res,next) =>{
    try {
        const feeds = await Feed.findAll({
            where:{
                usuarioEmail: req.user
            }
        })
        res.json({ feeds });
    } catch (error) {
        next(error)
    }
} 


module.exports = {
    getFeed
}