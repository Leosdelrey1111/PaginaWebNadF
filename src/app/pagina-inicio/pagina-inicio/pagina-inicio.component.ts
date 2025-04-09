import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../../services/reporte.service';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {
  cliente: string = '';
  usuario: string = '';
  errorMessage: string = '';

  clientes: string[] = [];
  clientesFiltrados: string[] = [];

  usuarios: string[] = [];
  usuariosFiltrados: string[] = [];

  constructor(private router: Router, private reporteService: ReporteService) {}

  ngOnInit() {
    this.cargarClientes();
    this.cargarUsuarios();
  }

  cargarClientes() {
    this.reporteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.clientesFiltrados = [...this.clientes]; // Copia inicial
      },
      error: (err) => console.error('Error al cargar clientes:', err)
    });
  }

  cargarUsuarios() {
    this.reporteService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuariosFiltrados = [...this.usuarios]; // Copia inicial
      },
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  filtrarClientes() {
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.toLowerCase().includes(this.cliente.toLowerCase())
    );
  }

  filtrarUsuarios() {
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.toLowerCase().includes(this.usuario.toLowerCase())
    );
  }

  buscar() {
    const queryParams: any = {};
    if (this.cliente) queryParams.cliente = this.cliente;
    if (this.usuario) queryParams.usuario = this.usuario;
    this.errorMessage = '';
    this.router.navigate(['/info'], { queryParams });
  }

  cancelar() {
    this.cliente = '';
    this.usuario = '';
    this.errorMessage = '';
    this.router.navigate(['/info'], { queryParams: { cancelar: true } });
  }
}
