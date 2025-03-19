import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Posiciones } from '../interfaces/posiciones';

@Injectable({
  providedIn: 'root'
})
export class PosicionesService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5014/api/Resultados/ObtenerClasificacion';
  protected PosicionesList:Posiciones[] = [];
  constructor() { }
  async getPosiciones(): Promise<Posiciones[]> {
      try {
        const response = await firstValueFrom(this.http.get<Posiciones[]>(this.baseUrl));
        // Mapea los Posiciones y transforma la imagen Base64 en una URL de datos
          this.PosicionesList = response ?? [];
          console.log('Posiciones cargados correctamente:', this.PosicionesList);

        return this.PosicionesList;

      } catch (e) {
        return [];
      }
    }
}
