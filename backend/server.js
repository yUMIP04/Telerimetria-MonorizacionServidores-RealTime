import Websocket, { WebSocketServer } from 'ws';
import { ObtenerDatosServidores } from './models/servidores.js';

const ws = new WebSocketServer({ port:8080});

const Servidor = await ObtenerDatosServidores();

console.log(Servidor.Servidor1);

/*Conexion Websocket */

ws.on('connection', function connection(ws) {

    console.log('Nuevo Cliente se a conectado');
})


/* Si el Servidor Funciona o no */
try{

setTimeout( () =>{

    console.log(`Servidor funcionando.`);
}, 1000 )

}catch(e){

    setTimeout( () =>{

    console.log(`Servidor no funciona.`);
}, 1000 )

}