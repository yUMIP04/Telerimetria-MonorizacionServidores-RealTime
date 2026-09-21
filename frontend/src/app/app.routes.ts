import { Routes } from '@angular/router';
import { DetallesServidorComponent } from './pages/detalles-servidor/detalles-servidor.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';

export const routes: Routes = [
    {path: 'servidor/:id',component:DetallesServidorComponent },
    {path:'panelAdmin', component:PanelAdminComponent}
];
