import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Resultados } from '../interfaces/resultados';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5014/api/Resultados';
  protected ResultadosList: Resultados[] = [];

  constructor() { }

  async getResultados(): Promise<Resultados[]> {
    try {
      const response = await firstValueFrom(this.http.get<Resultados[]>(this.baseUrl));
      // Mapea los Resultados y transforma la imagen Base64 en una URL de datos
        this.ResultadosList = response ?? [];
        console.log('Resultados cargados correctamente:', this.ResultadosList);

      return this.ResultadosList;

    } catch (e) {
      return [];
    }
  }

  async addResultados(Resultados:Resultados):Promise<Resultados | null> {
    try{
      const response = await firstValueFrom(this.http.post<Resultados>(this.baseUrl, Resultados));
      this.ResultadosList.push(response);
      return response;
    }catch(e){
      console.error('Error al agregar Resultados', e);
      return null;
    }
  }
  async updateResultados(id: number, Resultados: Resultados): Promise<Resultados | null> {
    try {
      const response = await firstValueFrom(this.http.put<Resultados>(`${this.baseUrl}/${id}`, Resultados));
      const updateResultados = this.ResultadosList.findIndex(Resultados => Resultados.id === id);
      if (updateResultados !== -1) {
        this.ResultadosList[updateResultados] = { ...this.ResultadosList[updateResultados], ...response };
      }
      console.log('Persona actualizada correctamente:', response);
      return response;
    } catch (error) {
      console.error('Error al actualizar Resultados:', error);
      return null;
    }
  }
  async deleteResultados(id: number): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
      this.ResultadosList = this.ResultadosList.filter(Resultados => Resultados.id!== id);
      console.log('Resultados eliminado correctamente:', id);
    } catch (error) {
      console.error('Error al eliminar Resultados:', error);
    }
  }
  async getResultadosById(id: number): Promise<Resultados> {
    try {
      const Resultados = await firstValueFrom(this.http.get<Resultados>(`${this.baseUrl}/${id}`));

      console.log('Resultados traído correctamente:', Resultados);
      return Resultados;

    } catch (e) {
      console.error('Error al traer el Resultados');
      return {} as Resultados;
    }
  }

  getLocalResultados(): Resultados[] {
    return this.ResultadosList;
  }
}
