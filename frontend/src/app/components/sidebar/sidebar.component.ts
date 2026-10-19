import { Component } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

   public user:string | null = "" ;

   ngOnInit(){
  this.nombre_usuario();
}
  
 public nombre_usuario(){

  if (typeof window !== undefined){

    const usuario_extraido = localStorage.getItem('usuario');
    this.user= usuario_extraido || 'invitado';
    
  }
   }
}
