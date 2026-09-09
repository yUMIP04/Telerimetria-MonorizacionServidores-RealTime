/* 🌟 SERVIDOR DE WEBSOCKET*/
import WebSocket, {WebSocketServer} from "ws";

const wss = new WebSocketServer( {

    port : 8080,
    perMessageDeflate: {

        zlibDeflateOptions: {
            chunkSize:1024,
            memLevel: 7,
            level: 3
        },

        zlibInflateOptions:{
            chunkSize: 10 * 1024
        },
        clientNoContextTakeover:true,
        serverNoContextTakeover: true,
        serverMaxWindowBits: 10,
        concurrencyLimit: 10,
        threshold: 1024
    }


});

/*🌟Conexion */

wss.on('connection', function connection(ws){
    console.log('¡Un nuevo clienter se ha conectado!');

    ws.on('message', function message(data){

        try{
        const mensaje_txt = data.toString();
        const mensajeJson = JSON.parse(mensaje_txt);
        console.log("Recibinedo mensaje de un cliente: ", mensajeJson);

        }catch(e){
            console.error(`Hubo un error con el mensaje: `, message.error);
        }
    })


    ws.on('close', function close(){
        console.log('Saliendo de la conexion...');
        console.log('¡Desconectado!');
    });

    wss.on('error', (error) =>{

        console.error("Hubo un error al nivel puerto TCP:", error);
    });
})
