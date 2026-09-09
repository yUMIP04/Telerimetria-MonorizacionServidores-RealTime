import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit} from '@angular/core'

/* Servicio de webSocket */
import { WebsocketAdapterService } from './services/websocket-adapter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  private wsService = inject(WebsocketAdapterService);

  ngOnInit(): void {
    this.wsService.conectar();

    this.wsService.obtenerMensajes().subscribe((mensaje) =>{
      console.log(`Mensaje Recibido desde el backend: ${mensaje}`);
    })

    setTimeout(() =>{

      this.wsService.enviar({
        tipo:'SALUDO',
        origen:'Angular 17',
        mensaje: 'Hola desde el cliente'
      });
    }, 500)
  }

}
