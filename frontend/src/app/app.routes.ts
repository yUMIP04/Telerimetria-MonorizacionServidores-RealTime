import { Routes } from '@angular/router';
import { DetallesServidorComponent } from './pages/detalles-servidor/detalles-servidor.component';

export const routes: Routes = [
    {path: 'servidor/:id',component:DetallesServidorComponent }
];
