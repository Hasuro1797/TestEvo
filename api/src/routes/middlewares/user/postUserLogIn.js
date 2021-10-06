const { Usuario, Profile } = require('../../../db.js');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../../utils/jwtGenerator');

const postUserLogIn = async (req,res,next) =>{
    const { email, password } = req.body;

    try {
        if(!email || !password) return res.status(401).send({ message: "User invalidated" });
        const user = await Usuario.findByPk(email,{
            include: {
                model: Profile
            }
        }); 
        //* user don't exist
        if(!user) {
            return res.status(401).send({ message: "User invalidated" });
        }

        //* Check if incomming id the same database paswword
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(401).send({ message: "User invalidated" });
        
        //* Give them  the jwt token
        const token = jwtGenerator(user.email);
        return res.send({ 
            token,
            user:{
                email: user.email,
                profile: user.profile
            }
        });
    } catch (error) {
        next(error)
    }
}   


module.exports = {
    postUserLogIn
}