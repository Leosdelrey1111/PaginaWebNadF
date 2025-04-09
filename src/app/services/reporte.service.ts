// src/app/services/reporte.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiltrosRequest, ReporteDTO } from '../interfaces/reporte'; // Asegúrate de importar la interfaz
import { environment } from '../../environments/environment';

// src/app/services/reporte.service.ts
@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = environment.apiUrl; // Aquí va la URL de tu API

  constructor(private http: HttpClient) {}

  // Función para obtener el reporte filtrado
  getReporteFiltrado(filtros: FiltrosRequest): Observable<ReporteDTO[]> {
    return this.http.post<ReporteDTO[]>(`${this.apiUrl}/reporte/filtros`, filtros);
  }

  // Función para obtener los clientes
  getClientes(searchTerm: string = ''): Observable<string[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<string[]>(`${this.apiUrl}/reporte/clientes`, { params });
  }

  // Función para obtener los usuarios
  getUsuarios(searchTerm: string = ''): Observable<string[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<string[]>(`${this.apiUrl}/reporte/usuarios`, { params });
  }

  // Función para generar el reporte en Excel
  generarExcel(filtros: FiltrosRequest): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/reporte/excel`, filtros, { responseType: 'blob' });
  }
}
