import { Component, Input, inject, OnInit, numberAttribute, OnDestroy } from '@angular/core';
import { WebsocketAdapterService } from '../../services/websocket-adapter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalles-servidor',
  standalone: true,
  imports: [],
  templateUrl: './detalles-servidor.component.html',
  styleUrl: './detalles-servidor.component.css'
})


export class DetallesServidorComponent implements OnInit, OnDestroy {

  @Input({ transform:numberAttribute}) id: number = 0 ;

  metricas : any = null;

  private Sub!: Subscription;

  private MiServicio = inject(WebsocketAdapterService);

  
  
  ngOnInit(): void {

    const Mensaje ={
    tipo : 'Suscribir_Metricas',
    id_Servidor : this.id
  };

  this.MiServicio.enviar(Mensaje);

  
  this.Sub = this.MiServicio.obtenerMensajes().subscribe({

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

  /*🌟Limpiar memoria */

  ngOnDestroy(): void {
  
    try{

    
     console.log("Cerrando fugas de memoria...");
    this.Sub.unsubscribe();
    console.log("🌟 Listo");
    
  }catch(e){

    console.error(`Hubo un error al cerrar la fuga de memoria: ${e}`);
    }
  }

}
