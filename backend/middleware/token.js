import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const CLAVE_SECRETA = process.env.CLAVE_SECRETA;

function Crear_Token(usuario, rol){

    try{

         const payload ={
        usuario: usuario,
        rol: rol
    }

    const token = jwt.sign(payload, CLAVE_SECRETA);

    console.log("Creando el Token de manera exitosa.");

        return token;

    } catch(e){

        console.log(`Hubo un error al crear el token: ${e}`);
    }

} 

export {Crear_Token};