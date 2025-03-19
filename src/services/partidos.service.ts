import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Partidos } from '../interfaces/partidos';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5014/api/Partidos';
  protected PartidosList: Partidos[] = [];

  constructor() { }

  async getPartidos(): Promise<Partidos[]> {
    try {
      const response = await firstValueFrom(this.http.get<Partidos[]>(this.baseUrl));
      // Mapea los Partidos y transforma la imagen Base64 en una URL de datos
        this.PartidosList = response ?? [];
        console.log('Partidos cargados correctamente:', this.PartidosList);

      return this.PartidosList;

    } catch (e) {
      return [];
    }
  }

  async addPartidos(partido:Partidos):Promise<Partidos | null> {
    try{
      const response = await firstValueFrom(this.http.post<Partidos>(this.baseUrl, partido));
      this.PartidosList.push(response);
      return response;
    }catch(e){
      console.error('Error al agregar partido', e);
      return null;
    }
  }
  async updatePartido(id: number, partido: Partidos): Promise<Partidos | null> {
    try {
      const response = await firstValueFrom(this.http.put<Partidos>(`${this.baseUrl}/${id}`, partido));
      const updatepartido = this.PartidosList.findIndex(partido => partido.id === id);
      if (updatepartido !== -1) {
        this.PartidosList[updatepartido] = { ...this.PartidosList[updatepartido], ...response };
      }
      console.log('Persona actualizada correctamente:', response);
      return response;
    } catch (error) {
      console.error('Error al actualizar partido:', error);
      return null;
    }
  }
  async deletePartido(id: number): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
      this.PartidosList = this.PartidosList.filter(partido => partido.id!== id);
      console.log('partido eliminado correctamente:', id);
    } catch (error) {
      console.error('Error al eliminar partido:', error);
    }
  }
  async getpartidoById(id: number): Promise<Partidos> {
    try {
      const partido = await firstValueFrom(this.http.get<Partidos>(`${this.baseUrl}/${id}`));

      console.log('partido traído correctamente:', partido);
      return partido;

    } catch (e) {
      console.error('Error al traer el partido');
      return {} as Partidos;
    }
  }

  getLocalPartidos(): Partidos[] {
    return this.PartidosList;
  }
}


