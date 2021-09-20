const { Usuario, Profile } = require('../../../db.js');

const postUserLogIn = async (req,res,next) =>{
    const { email, password } = req.body;
    try {
        if(!email || !password) return res.send({errorMessage: "User invalidated"});
        const user = await Usuario.findOne({
            include:{
                model: Profile
            },
            where:{
                email: email
            }
        }) 
        if(!user) {
            return res.send({errorMessage: "User invalidated"})
        }else if(password !== user.dataValues.password){
            return res.send({errorMessage: "User invalidated"})
        }
        return res.send({user: user.dataValues});
    } catch (error) {
        next(error)
    }
}


module.exports = {
    postUserLogIn
}