import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  public usuario:string | null = null;
  private ws : WebSocket | null = null ;
  public AvisoActual : any = null;
  public AvisosList : any[] = [];
  public Aviso_cliente:any = null;
  public Aviso_ClienteList: any[] = [];


  ngOnInit(){

    this.ws = new WebSocket('ws://localhost:8080');

    this.ws.onmessage = (event) => {

      if(event.data){

        
        const datos_ws = JSON.parse(event.data);
        this.AvisoActual = datos_ws;
        this.AvisosList.push(this.AvisoActual);

        console.log(this.AvisosList);
      }

      /*Mostrar los avisos del cliente */

      


    }
  }

/*Alerta Resuelta- Funcion */
  public Alerta_Resuelta(AvisoResuelto:any) : void {

    if (typeof window !== 'undefined'){

      this.usuario = localStorage.getItem('usuario');

      const payload = {
      evento: 'Alerta_Resuelta', 
      usuario: this.usuario
    };

    this.ws?.send(JSON.stringify(payload));

   this.AvisosList = this.AvisosList.filter(aviso => aviso !== AvisoResuelto);
    }
    
  }
  

  /*Alerta Reconocida- Funcion */

  public Alerta_Reconocida(alerta:any, servidor:any) : void{

    if ( typeof window !== 'undefined'){

      this.usuario = localStorage.getItem('usuario');

      const payload = {
        "Mensaje": "¡Alerta reconocida! un operador ya se encuentra resolviendo el problema",
        "operador": this.usuario,
        "Alerta": alerta,
        "Servidor": servidor
      }

      console.log(payload);

      try{

        this.ws?.send(JSON.stringify(payload));

      }catch(e){

        console.error("Hubo un problema al enviar mensaje de Alerta Reconocida", e);

      }

    }

  }
}
