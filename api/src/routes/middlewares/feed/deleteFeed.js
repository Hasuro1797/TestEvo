const { Feed } = require('../../../db.js');


const deleteFeed = async(req,res,next) =>{
    const { feedId, userId } = req.body;
    try {
        await Feed.destroy({
            where:{
                id: feedId
            }
        })
        const feeds = await Feed.findAll({
            where:{
                usuarioId: userId
            }
        })
        res.send({feeds: feeds});
    } catch (error) {
        next(error)
    }
}


module.exports = {
    deleteFeed
}