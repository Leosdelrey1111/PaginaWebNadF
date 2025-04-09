import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404pageComponent } from './shared/pages/error404page/error404page.component';
import { PaginaInfoComponent } from './pagina-info/pagina-info/pagina-info.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio/pagina-inicio.component';

const routes: Routes = [
  {path: '', component: PaginaInicioComponent},
  { path: 'info', component:  PaginaInfoComponent },
  { path: '404', component: Error404pageComponent },
  { path: '**', redirectTo: '404' }  // Cualquier ruta desconocida va a 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
