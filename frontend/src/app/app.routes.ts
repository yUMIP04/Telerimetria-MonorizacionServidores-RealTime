import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import path from 'path';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'}, /* Ruta de raiz dirige al login */
    {path:'login', component:LoginComponent},
    {path:'dashboard', component:DashboardComponent},
    {path: '**', redirectTo:'login' } /*Ruta comodin por si alguien accede a otra URL que no existe, r4edirige aqui */
];
