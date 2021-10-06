const { Usuario, Profile } = require('../../../db');
const postVerify = async(req, res, next) =>{
    try {
        const user = await Usuario.findByPk(req.user,{
            attributes: ['email'],
            include:{
                model: Profile
            }
        });
        res.json({
            user
        });
    }catch (e) {
        next(error);
    }
}

module.exports = postVerify;