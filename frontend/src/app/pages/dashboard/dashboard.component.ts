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

        console.log(datos_ws);
        this.AvisoActual = datos_ws;
        this.AvisosList.push(this.AvisoActual);

        console.log("Avisos Listas: ",this.AvisosList);

        /*Mostrar los avisos del cliente */

        if(datos_ws.Mensaje == "¡Alerta reconocida! un operador ya se encuentra resolviendo el problema" || datos_ws.Mensaje == "Alerta_Resuelta"){

          this.Aviso_cliente = datos_ws;
         

          console.log("Avisos Clientes: ", this.Aviso_ClienteList);

         
               this.Aviso_ClienteList.push(this.Aviso_cliente);

               setTimeout(() => {

                this.Aviso_ClienteList = this.Aviso_ClienteList.filter(item => item !== this.Aviso_cliente);

               }, 2000)
        
          
        }
      }

      


    }
  }

/*Alerta Resuelta- Funcion */
  public Alerta_Resuelta(AvisoResuelto:any, aviso:any, servidor:any) : void {

    if (typeof window !== 'undefined'){

      this.usuario = localStorage.getItem('usuario');

      const payload = {
      Mensaje: 'Alerta_Resuelta', 
      operador: this.usuario,
       Alerta: aviso,
       Servidor: servidor
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
        Mensaje: "¡Alerta reconocida! un operador ya se encuentra resolviendo el problema",
        operador: this.usuario,
        Alerta: alerta,
        Servidor: servidor
      }

      console.log(payload);

        this.ws?.send(JSON.stringify(payload));


    }

  }
}
