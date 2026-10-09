import express from 'express';
import db_connect from '../config/db.js';
import MyModel from '../models/ModelUsers.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const app = express();
await db_connect();

app.use(express.json())


/* Prueba de Servidor */
app.get("/", (req, res) =>{

    res.send("Servidor Funcionando");
})

/* Login */

app.post("/login", async (req, res) =>{

    try{

        const { user, pass} = req.body;

        const usuario = await MyModel.findOne({username:user});

       

        if (!usuario){

            return res.status(404).json({
                Mensaje: "El usuario No existe"
            })
        }

         const comparacion_pass = await bcrypt.compare(pass, usuario.password);

        if (!comparacion_pass){

            return res.json({
                Mensaje: "La contraseña no existe",
            })
        }

        return res.status(200).json({
            Mensaje: "Inicio de sesion exitoso",
            usuario:user
        })

    }catch(e){

        return res.status(500).json({
            mensaje: "Error de Servidor",
            Error: e
        })
    }
})

/* Levantando Servidor */
app.listen(3000, () => {

    console.log('Servidor en http://localhost:3000');
})