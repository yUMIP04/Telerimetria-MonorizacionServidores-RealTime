import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketAdapterService {

  private socket: WebSocket | null = null;
  private mensajes$ = new Subject<any>();
  private URL_conexion: string  = 'ws://localhost:8080';
  constructor() { }
}
