const { Feed } = require('../../../db.js');

const postFeed = async(req,res,next) =>{
    const { userId, title, price, status, payment, image, description } = req.body;
    try {
        if(title && price && status &&  image && description){
            const feed = await Feed.create({
                title,
                price,
                status,
                payment,
                img: image,
                description
            })
            await feed.setUsuario(userId);
            const feeds = await Feed.findAll({
                where:{
                    usuarioId: userId
                }
            })
            res.send({feeds: feeds});
        }else{
            res.status(422).send({errorMessage: "Datos insuficientes"})
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    postFeed
}