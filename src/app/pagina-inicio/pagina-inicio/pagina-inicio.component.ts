import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../../services/reporte.service';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent {
  cliente: string = '';
  usuario: string = '';
  errorMessage: string = '';  // Variable para el mensaje de error

  constructor(
    private router: Router,
    private reporteService: ReporteService
  ) {}

  buscar() {
    // Validar que al menos un campo esté lleno
    if (!this.cliente && !this.usuario) {
      this.errorMessage = 'Al menos uno de los campos debe estar lleno para realizar la búsqueda.';
      return;  // Si no hay datos en ninguno de los campos, no continuar
    }

    // Si cliente o usuario están vacíos, los enviamos como arreglo vacío.
    const queryParams = {
      cliente: this.cliente ? this.cliente : null,
      usuario: this.usuario ? this.usuario : null
    };

    // Limpiar el mensaje de error si la búsqueda es válida
    this.errorMessage = '';
    
    this.router.navigate(['/info'], { queryParams });
  }

  cancelar() {
    this.cliente = '';
    this.usuario = '';
    this.errorMessage = '';  // Limpiar el mensaje de error al cancelar
    // Si se cancela, se envían null o un array vacío según corresponda
    this.router.navigate(['/info'], {
      queryParams: { cliente: null, usuario: null }
    });
  }
}
