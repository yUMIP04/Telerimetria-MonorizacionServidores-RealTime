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
    console.log('¡Un nuevo cliente se ha conectado!');

    /*🌟Datos a mandar el servidor */


    const Servidor1={
        "id_Servidor": 1,
      "nombre_nodo": " Nodo de Prueba",
      "Direccion_IP": "198.198.05",
      "region": " Ciudad de Mexico",
      "estado": "Fuera de Linea",
      "CPU": 89,
      "Memoria_RAM":89,
      "Latencia_de_Red":0,
      "Tasa_de_errores_por_minuto": 0
    }

     const cronometro_CPU = setInterval( () =>{
        
    if (Servidor1["CPU"] > 85){

        const now = new Date();

        const Alerta = {
            "TipodeAlerta": "CRITICA",
            "id_Servidor": Servidor1.id_Servidor,
            "Concepto": `El servidor ${Servidor1.nombre_nodo} ha pasado del 85% en su CPU`,
            "Time": `${now.toLocaleDateString()} - ${now.toLocaleTimeString()} ` ,
            "Estatus_Alerta": ""
        }

        const cartelito = JSON.stringify(Alerta);

        ws.send(cartelito)
    } 

    }, 30000)

    const cronometro_SeñalCPU = setInterval( () =>{

        const now = new Date();

        const Alerta = {
            "TipodeAlerta": "CRITICA",
            "id_Servidor": Servidor1.id_Servidor,
            "Concepto": `El servidor ${Servidor1.nombre_nodo} esta fuera de linea`,
            "Time": `${now.toLocaleDateString()} - ${now.toLocaleTimeString()} ` ,
            "Estatus_Alerta": ""
        }

        const cartelito = JSON.stringify(Alerta);

        ws.send(cartelito);

    }, 10000 )

    /* === Fin de los datos a mandar === */

    ws.on('message', function message(data){

        try{
        const mensaje_txt = data.toString();
        const mensajeJson = JSON.parse(mensaje_txt);

        console.log("Recibiendo mensaje de un cliente: ", mensajeJson);

        const date = new Date();

            const metricas = {
                "tipo": "Suscribir_Metricas",
                "id_Servidor": mensajeJson.id_Servidor,
                "nombre_nodo": Servidor1.nombre_nodo,
                "Direccion_IP": Servidor1.Direccion_IP,
                "region": Servidor1.region,
                "estado": Servidor1.estado,
                "CPU": Servidor1.CPU,
                "Memoria_RAM":Servidor1.Memoria_RAM,
                "Latencia_de_Red":Servidor1.Latencia_de_Red,
                "Tasa_de_errores_por_minuto": Servidor1.Tasa_de_errores_por_minuto
            }

            switch (mensajeJson.tipo){

              case 'Suscribir_Metricas':
                
              const mensaje_metricas =JSON.stringify(metricas);

              ws.send(mensaje_metricas);
              break;
            }
        

        }catch(e){
            console.error(`Hubo un error con el mensaje: `, e.message);
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

setTimeout(() =>{
    console.log("🥳 Servidor Funcionando");
}, 500)
