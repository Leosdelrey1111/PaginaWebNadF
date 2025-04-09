import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInfoComponent } from './pagina-info/pagina-info.component';

const routes: Routes = [
  { 
    path: '', // Ruta base: /paciente
    component: PaginaInfoComponent,
    children: [
      { path: 'agenda', component: PaginaInfoComponent },
      
      { path: '', redirectTo: 'agendar', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaInfoRoutingModule { }
