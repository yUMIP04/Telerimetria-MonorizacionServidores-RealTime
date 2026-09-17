import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalles-servidor',
  standalone: true,
  imports: [],
  templateUrl: './detalles-servidor.component.html',
  styleUrl: './detalles-servidor.component.css'
})


export class DetallesServidorComponent {

  @Input() id: string = '' ;

}
