import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteService } from '../../services/reporte.service';
import { FiltrosRequest, ReporteDTO } from '../../interfaces/reporte';

@Component({
  selector: 'app-pagina-info',
  templateUrl: './pagina-info.component.html',
  styleUrls: ['./pagina-info.component.css']
})
export class PaginaInfoComponent implements OnInit {
  filtros = {
    cliente: '',
    usuario: ''
  };

  tablaDatos: ReporteDTO[] = [];
  clientes: string[] = [];
  usuarios: string[] = [];

  isGenerating: boolean = false;  // Bandera de control para el botón
  mensajeGenerando: string = '';  // Mensaje que se muestra mientras se genera el reporte

  constructor(
    private route: ActivatedRoute,
    private reporteService: ReporteService
  ) {}

  ngOnInit() {
    // Al cargar la página, se intentan recuperar los filtros desde sessionStorage
    const filtrosGuardados = sessionStorage.getItem('filtros');
    if (filtrosGuardados) {
      this.filtros = JSON.parse(filtrosGuardados);
    }

    // Obtener parámetros de la URL y actualizar los filtros si no están vacíos
    this.route.queryParams.subscribe(params => {
      if (params['cliente']) {
        this.filtros.cliente = params['cliente'];
      }
      if (params['usuario']) {
        this.filtros.usuario = params['usuario'];
      }
      this.cargarDatos();
    });

    // Cargar datos de clientes y usuarios al inicializar
    this.cargarClientes();
    this.cargarUsuarios();
  }

  private cargarDatos() {
    const filtrosRequest: FiltrosRequest = {
      Clientes: this.filtros.cliente ? [this.filtros.cliente] : [],
      Usuarios: this.filtros.usuario ? [this.filtros.usuario] : []
    };

    console.log('Filtros enviados:', filtrosRequest);  // Verifica qué filtros se están enviando

    this.reporteService.getReporteFiltrado(filtrosRequest).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);  // Verifica qué datos se están recibiendo
        this.tablaDatos = data;
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
      }
    });
  }

  private cargarClientes() {
    this.reporteService.getClientes().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Error al cargar clientes:', err)
    });
  }

  private cargarUsuarios() {
    this.reporteService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  limpiarFiltros() {
    this.filtros = { cliente: '', usuario: '' };
    sessionStorage.setItem('filtros', JSON.stringify(this.filtros));  // Guardar los filtros limpios
    this.cargarDatos();
  }

  filtrarDatos() {
    sessionStorage.setItem('filtros', JSON.stringify(this.filtros));  // Guardar los filtros actuales
    this.cargarDatos();
  }

  generarReporte() {
    if (this.isGenerating) return;

    this.isGenerating = true;
    this.mensajeGenerando = 'Generando reporte...';

    const filtrosRequest: FiltrosRequest = {
      Clientes: this.filtros.cliente ? [this.filtros.cliente] : [],
      Usuarios: this.filtros.usuario ? [this.filtros.usuario] : []
    };

    this.reporteService.generarExcel(filtrosRequest).subscribe({
      next: (blob) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = `Reporte_${new Date().toISOString().slice(0, 10)}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);

        setTimeout(() => {
          this.isGenerating = false;
          this.mensajeGenerando = '';
        }, 5000);
      },
      error: (error) => {
        console.error('Error al generar el reporte:', error);
        this.isGenerating = false;
        this.mensajeGenerando = 'Hubo un error al generar el reporte. Inténtalo de nuevo.';
      }
    });
  }
}
