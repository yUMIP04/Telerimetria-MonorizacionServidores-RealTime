import mongoose, { Schema } from "mongoose";
import db_connect from "../config/db.js";

const Usuario = new Schema({

    username:{type: String, required:true, unique:true, trim:true },
    password:{type: String, required:true, unique:true, trim:true},
    rol: { type: String, required:true,trim:true, enum:['admin', 'operador']}
})

const MyModel = mongoose.model('User', Usuario);

export default MyModel;