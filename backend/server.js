import si from 'systeminformation';
import geoip from 'geoip-lite';
import Websocket, { WebSocketServer } from 'ws';


async function ObtenerDatosServidores() {

    /* =============== INFORMACION DE SERVIDORES ======================== */

    const CPU = await si.currentLoad();
    const Nombre_nodo = await si.osInfo();
    const Direccion_IP = await si.networkInterfaces();
    const Memoria_RAM = await si.mem();
    const Latencia_Red = await si.inetLatency(Nombre_nodo.hostname);

     const DireccionIP_find = Direccion_IP.find(ip => ip.ip4 !== "127.0.0.1" );

     const dip = "200.33.146.241" ;
     const Region = geoip.lookup(dip);

         /* Calculos RAM */

    const MemoriaRAM_used = Memoria_RAM.used;
    const RAM_a_GB = parseFloat(MemoriaRAM_used) / (1024 * 1024 * 1024);
    const RAM = RAM_a_GB.toFixed(3);

    /* Lecturas */
    console.log(DireccionIP_find.ip4);
    console.log(Region);


    const Servidores = {

        Servidor1 : {
            "Nombre_Nodo": Nombre_nodo.hostname,
            "Direccion_IP": DireccionIP_find.ip4,
            "CPU": CPU.currentLoad.toFixed(3),
            "Memoria_RAM": RAM,
            "Latencia_Red(ms)": Latencia_Red,
            "Tasa_errores_por_minuto": 0,
            "Region": Region.timezone,
            "Estado_Actual": "En Linea"
        },

        Servidor2 : {
            "Nombre_Nodo": "Servidor2",
            "Direccion_IP": "192.168.56.2",
            "CPU": 11.37,
            "Memoria_RAM": 13.81,
            "Latencia_Red(ms)": 0,
            "Tasa_errores_por_minuto": 0,
            "Region": "Mexico/center",
            "Estado_Actual": "En Linea"
        },

        Servidor3 : {
            "Nombre_Nodo": "Servidor3",
            "Direccion_IP": "192.168.56.1",
            "CPU": 14.56,
            "Memoria_RAM": 14.81,
            "Latencia_Red(ms)": 0,
            "Tasa_errores_por_minuto": 0,
            "Region": "Mexico/Center",
            "Estado_Actual": "En Linea"
        }
    }

    
}

ObtenerDatosServidores();