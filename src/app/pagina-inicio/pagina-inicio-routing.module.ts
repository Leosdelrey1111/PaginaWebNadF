import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';

const routes: Routes = [
  { 
    path: '', // Ruta base: /paciente
    component: PaginaInicioComponent,
    children: [
      { path: 'agenda', component: PaginaInicioComponent },
      
      { path: '', redirectTo: 'agendar', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaInicioRoutingModule { }
