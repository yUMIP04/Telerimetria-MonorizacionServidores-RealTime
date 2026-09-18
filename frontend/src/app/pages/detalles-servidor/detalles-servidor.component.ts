import { Component, Input, inject, OnInit, numberAttribute } from '@angular/core';
import { WebsocketAdapterService } from '../../services/websocket-adapter.service';

@Component({
  selector: 'app-detalles-servidor',
  standalone: true,
  imports: [],
  templateUrl: './detalles-servidor.component.html',
  styleUrl: './detalles-servidor.component.css'
})


export class DetallesServidorComponent implements OnInit {

  @Input({ transform:numberAttribute}) id: number = 0 ;

  metricas : any = null;

  private MiServicio = inject(WebsocketAdapterService);

  ngOnInit(): void {

    const Mensaje ={
    tipo : 'Suscribir_Metricas',
    id_Servidor : this.id
  };

  this.MiServicio.enviar(Mensaje);

  
  this.MiServicio.obtenerMensajes().subscribe({

    next: (datos) => {

      if (datos.tipo === 'Suscribir_Metricas' && datos.id_Servidor === this.id){

        this.metricas = datos;

      }
    },

    error: (err) => {
      console.error(`Error en el flujo de WebSocket: ${err}`);
    }

  })

  }

}
