import Websocket, { WebSocketServer } from 'ws';
import { ObtenerDatosServidores } from './models/servidores.js';

const ws = new WebSocketServer({ port:8080});


/*Conexion Websocket */

ws.on('connection', async function connection(ws) {

    console.log('Nuevo Cliente se a conectado');

    const CPU_Alerta = setInterval( async () =>{

        const Servidor = await ObtenerDatosServidores();

        const now = new Date();

          if(Servidor.Servidor1?.CPU > 85 ){

        const Alerta_CPU = {
            "Servidor": Servidor.Servidor1.Nombre_Nodo,
            "Tipo_Alerta": "El CPU supero el 85%",
            "Estado_Actual": "Critico",
            "Fecha": `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`
        }

        const CPU_Cartel = JSON.stringify(Alerta_CPU);

        ws.send(CPU_Cartel);

    }

       if(Servidor.Servidor2?.CPU > 85 ){

        const Alerta_CPU = {
            "Servidor": Servidor.Servidor2.Nombre_Nodo,
            "Tipo_Alerta": "El CPU supero el 85%",
            "Estado_Actual": "Critico",
            "Fecha": `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`
        }

        const CPU_Cartel = JSON.stringify(Alerta_CPU);

        ws.send(CPU_Cartel);

    }

       if(Servidor.Servidor3?.CPU > 85 ){

        const Alerta_CPU = {
            "Servidor": Servidor.Servidor3.Nombre_Nodo,
            "Tipo_Alerta": "El CPU supero el 85%",
            "Estado_Actual": "Critico",
            "Fecha": `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`
        }

        const CPU_Cartel = JSON.stringify(Alerta_CPU);

        ws.send(CPU_Cartel);

    }

    }, 30000);

    ws.on('close' , () =>{
        clearInterval(CPU_Alerta);
        console.log("Cliente desconectado");
    })

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