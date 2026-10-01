import si from 'systeminformation';

async function ObtenerDatosServidores() {

    /* Informacion de Servidores */

    const CPU = await si.currentLoad();
    const Nombre_nodo = await si.osInfo();
    const Direccion_IP = await si.networkInterfaces();

    const Servidores = {

        Servidor1 : {
            "Nombre_Nodo": Nombre_nodo.hostname,
            "Direccion_IP": Direccion_IP.ip4,
            "CPU": CPU.currentLoad,
            "Memoria_RAM": "",
            "Latencia_Red(ms)": "",
            "Tasa_errores_por_minuto": "",
            "Region": "",
            "Estado_Actual": ""
        },

        Servidor2 : {
            "Nombre_Nodo": "Servidor2",
            "Direccion_IP": "",
            "CPU": "",
            "Memoria_RAM": "",
            "Latencia_Red(ms)": "",
            "Tasa_errores_por_minuto": "",
            "Region": "",
            "Estado_Actual": ""
        },

        Servidor3 : {
            "Nombre_Nodo": "Servidor3",
            "Direccion_IP": "",
            "CPU": "",
            "Memoria_RAM": "",
            "Latencia_Red(ms)": "",
            "Tasa_errores_por_minuto": "",
            "Region": "",
            "Estado_Actual": ""
        }
    }

    /*Lecturas */

    console.log( "Informacion del CPU: ", CPU.currentLoad);
    console.log( "Nombre del Nodo: ", Nombre_nodo.hostname);
    console.log( "Direccion IP del dispostivo: ",  Direccion_IP.ip4);

    
}

ObtenerDatosServidores();