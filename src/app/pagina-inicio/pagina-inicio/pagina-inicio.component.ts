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
    // Si no se colocan filtros, mostrar todos los datos
    const queryParams: any = {};
  
    if (this.cliente) {
      queryParams.cliente = this.cliente;
    }
    if (this.usuario) {
      queryParams.usuario = this.usuario;
    }
  
    this.errorMessage = '';
    
    // Redirigir con los parámetros adecuados
    this.router.navigate(['/info'], { queryParams });
  }
  
  cancelar() {
    this.cliente = '';
    this.usuario = '';
    this.errorMessage = '';
  
    // Al cancelar, redirigir con un flag para indicar que se deben limpiar los datos
    this.router.navigate(['/info'], { queryParams: { cancelar: true } });
  }
  
}
