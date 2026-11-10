import Websocket, { WebSocketServer } from 'ws';
import { ObtenerDatosServidores } from './models/servidores.js';

const wss = new WebSocketServer({ port:8080});


/*Conexion Websocket */

wss.on('connection', async function connection(ws) {

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

     /* Escuchando el cliente */

    ws.on('message', (data) => {

        const datosCliente = JSON.parse(data.toString());

        if (datosCliente.evento == 'Alerta_Resuelta'){
            console.log(datosCliente);

            for(let cliente of wss.clients){

                if(cliente.readyState === Websocket.OPEN){

                    cliente.send(JSON.stringify(datosCliente));
                }
            }

            clearInterval(CPU_Alerta);
            
        }

        if(datosCliente.Mensaje == "¡Alerta reconocida! un operador ya se encuentra resolviendo el problema"){

            for(let cliente of wss.clients){

                if(cliente.readyState === WebSocket.OPEN){

                    cliente.send(JSON.stringify(datosCliente));

                }
            }
        }

    })

    /* Cierre de Conexion */

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