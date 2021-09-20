const { Feed } = require('../../../db.js');

const getFeed = async(req,res,next) =>{
    const {user} = req.query;
    try {
        const feeds = await Feed.findAll({
            where:{
                usuarioId: user
            }
        })
        res.send(feeds)
    } catch (error) {
        next(error)
    }
} 


module.exports = {
    getFeed
}