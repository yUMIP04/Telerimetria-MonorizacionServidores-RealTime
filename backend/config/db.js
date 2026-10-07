import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.MONGO_URI;

const db_connect = async () =>{

    try{

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Se hizo la conexion correctamente.");

    }catch(e){

        console.error(`Se hizo mal la conexion a MongDB: ${e}`);

    }
}

export default db_connect;