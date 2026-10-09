import db_connect from "../config/db.js";
import MyModel from "../models/ModelUsers.js";
import bcrypt from 'bcrypt';

await db_connect();

const contra = async () =>{

    const contraseña_encriptada = await bcrypt.hash('Luna123', 10);

    return contraseña_encriptada;
}

const contraseña = await contra();

const instance = new MyModel({
    username: 'Yumi',
    password: contraseña ,
    rol: 'admin'
})

instance.save().then( (mensaje) =>{

    console.log(`Se guardo un usuario: ${mensaje.username}`);

})
 .catch((error) =>{

    console.error(`Hubo un error al crear el usuario: ${error}`);
 })