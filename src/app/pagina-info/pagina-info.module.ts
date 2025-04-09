import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaInfoRoutingModule } from './pagina-info-routing.module';
import { PaginaInfoComponent } from './pagina-info/pagina-info.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaginaInfoComponent
  ],
  imports: [
    CommonModule,
    PaginaInfoRoutingModule,
    FormsModule
  ]
})
export class PaginaInfoModule { }
