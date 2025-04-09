import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaInicioRoutingModule } from './pagina-inicio-routing.module';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaginaInicioComponent
  ],
  imports: [
    CommonModule,
    PaginaInicioRoutingModule,
    FormsModule,
    
  ]
})

export class PaginaInicioModule { }
