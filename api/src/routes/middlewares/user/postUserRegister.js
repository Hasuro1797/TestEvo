const { Usuario, Profile } = require('../../../db.js');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../../utils/jwtGenerator');

const postUserRegister = async (req, res ,next) =>{
    const { email, password, name, lastName } = req.body;
    if(email && password && name && lastName){
        try {
            //* Find if user exist
            const findUser = await Usuario.findByPk(email);
            if(findUser) return res.status(401).send({ message: "User currently exists"})
            
            // *Bycript the user password
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password, salt);

            //* Create the user
            const user = await Usuario.create({
                email,
                password: bcryptPassword
            });
            const profile = await Profile.create({
                name,
                lastName
            });
            //* Table relation
            await profile.setUsuario(user.email);

            //* Generating our jwt token
            const token = jwtGenerator(user.email);
            res.send({ 
                token,
                user:{
                    email: user.email, 
                    profile
                }
            });
        } catch (error) {
            next(error);
        }
    }else{
        res.status(401).send({ message: "Did not receive enough data to create new user"})
    }
}


module.exports = {
    postUserRegister
}