export interface FiltrosRequest {
    Clientes: string[];
    Usuarios: string[];
  }
// Corregir a camelCase para coincidir con el JSON
export interface ReporteDTO {
    cliente: string;  // Antes era Cliente
    usuario: string;  // Antes era Usuario
    sox: string;      // Antes era SOX
    sgce: string;     // Antes era SGCE
    sgro: string;
    sgov: string;
    sgi: string;
    sgc: string;
    sia: string;
    soqvdc: string;
    sscs: string;
  }
  