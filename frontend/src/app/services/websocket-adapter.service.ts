import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketAdapterService {

  private socket: WebSocket | null = null;
  private mensajes$ = new Subject<any>();
  private URL_conexion: string  = 'ws://localhost:8080';
  private colaPendientes: any[] = [];

  constructor() {}

  public obtenerMensajes(): Observable<any> {
    return this.mensajes$.asObservable();
  }

  public conectar(): void {
    this.socket = new WebSocket(this.URL_conexion);

    this.socket.onopen = (evento) =>{
      console.log(`Conexion establecida con el servidor WebSocket`);

      while(this.colaPendientes.length > 0 ){
        const MensajeGuardado = this.colaPendientes.shift();
        this.socket?.send(JSON.stringify(MensajeGuardado))
      }
    };

   
    this.socket.onmessage = (evento) =>{
      try{

        const datos = JSON.parse(evento.data);

        this.mensajes$.next(datos);

      }catch(error){
        console.error(`Error al parsear el mensaje: ${error}`);
      }
    };

    this.socket.onerror = (error) =>{
      console.error(`Error en el Socket: ${error}`)
    };

    this.socket.onclose = (evento) =>{
      console.warn("❌ Conexion WebSocket cerrada")
    }
    
    }

    public enviar(datos: any) : void {

      if(this.socket && this.socket.readyState == WebSocket.OPEN) {
        this.socket.send(JSON.stringify(datos))

      }else{

       
        console.warn(`Socket aun no esta listo, encolando mensaje...`);
        this.colaPendientes.push(datos); 
      }
    }
  }

