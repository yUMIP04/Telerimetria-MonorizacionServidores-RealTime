import { Component, OnInit,inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  public user:string | null = "" ;
  private router = inject(Router);

ngOnInit(){
  this.nombre_usuario();
}
  
 public nombre_usuario(){

  if (typeof window !== undefined){

    const usuario_extraido = localStorage.getItem('usuario');
    this.user= usuario_extraido || 'invitado';
    
  }

 }

 public Cerrar_Sesion(){

  if(typeof window !== undefined){
    localStorage.removeItem('usuario');
    localStorage.removeItem('token')

    console.log('Removiendo token y usuario de localstorage');

    this.router.navigate(['/login']);
  }

  

 }

}
