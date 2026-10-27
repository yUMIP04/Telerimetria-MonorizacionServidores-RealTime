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

  private ws : WebSocket | null = null ;
  public AvisoActual : any = null;

  ngOnInit(){

    this.ws = new WebSocket('ws://localhost:8080');

    this.ws.onmessage = (event) => {

      if(event.data){

        
        const datos_ws = JSON.parse(event.data);
        this.AvisoActual = datos_ws;
        
        console.log(this.AvisoActual);
      }


    }
  }
  
}
