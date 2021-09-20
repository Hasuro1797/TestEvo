const { Usuario, Profile } = require('../db');
const createUser = () =>{
    Usuario.findAndCountAll()
    .then(async(result) =>{
        if(result.count === 0){
            try {
                const user = await Usuario.create({
                    email: "usuarioPrueba@gmail.com",
                    password: 123456
                });
                const profile = await Profile.create({
                    name: "Señor",
                    lastName: "Usuario"
                })
                await profile.setUsuario(user.id);
            } catch (error) {
                console.error("hubo un error", error);
            }
        }else{
            console.log("usuarios agregados:", result.count)
        }
    })
    .catch(error => console.error("error en usuario", error))
}
module.exports = createUser;