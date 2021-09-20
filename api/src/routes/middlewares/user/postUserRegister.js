const { Usuario, Profile } = require('../../../db.js');

const postUserRegister = async (req, res ,next) =>{
    const { email, password, name, lastName} = req.body;
    if(email && password && name && lastName){
        try {
            const user = await Usuario.create({
                email,
                password
            });
            const profile = await Profile.create({
                name,
                lastName
            });
            await profile.setUsuario(user.id);
            res.send({successMessage: "Pofile created successfully"});
        } catch (error) {
            next(error);
        }
    }else{
        res.status(422).send({errormessage: "Did not receive enough data to create new user"})
    }
}


module.exports = {
    postUserRegister
}