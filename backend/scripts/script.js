import db_connect from "../config/db.js";
import MyModel from "../models/ModelUsers.js";


db_connect();

const instance = new MyModel({
    username: 'Victoria',
    password: 'Yumi3012',
    rol: 'admin'
})

instance.save()