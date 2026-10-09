import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  public user: string = '';
  public pass: string = '';

 public async Login() {

  try{

 
  const API = await fetch('http://localhost:3000/login',{

    method: 'POST',

    headers:{
      'content-type': 'application/json'
    },

    body:JSON.stringify({
      user:this.user,
      pass:this.pass
    })

  })

  const respuesta = await API.json();

  return respuesta;

 }catch(e){

  console.error(`No se pudo iniciar sesion: ${e}`);

 }

 }


}
