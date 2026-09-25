import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { OnInit} from '@angular/core'

/*Iconos */
import { MatIconModule } from '@angular/material/icon';

/* Servicio de webSocket */
import { WebsocketAdapterService } from './services/websocket-adapter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})


export class AppComponent implements OnInit {
  title = 'frontend';

  /*🌟 Mis Variables */
  public alertas: any[] = [];

  public Notificacion : boolean = false;

  private wsService = inject(WebsocketAdapterService);

  ngOnInit(): void {
    this.wsService.conectar();

    this.wsService.obtenerMensajes().subscribe((mensaje) =>{

      console.log(`Mensaje Recibido desde el backend:`, mensaje);

      this.Notificacion = true;
      console.log("📧 Agregando nuevo mesaje ...");
      this.alertas.unshift(mensaje);
      console.log("🥳 Nuevo mensaje guardado con exito");

    })

  
  }

  
    /*🌟 Clientes - Servidor*/

    reconocerAlerta(alerta:any): void {

      const payload = {
        tipo: "Reconocer_Alerta",
        id_Servidor: alerta.id_Servidor,
        timestampAlerta : alerta.Time,
        operador: 'Admin'
      };

      this.wsService.enviar(payload);
    }

   

}
