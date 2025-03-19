import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Equipos } from '../interfaces/equipos';
@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5014/api/Equipos';
  protected equiposList:Equipos[] = [];


  constructor() { }
  async getEquipos(): Promise<Equipos[]> {
    try {
      const response = await firstValueFrom(this.http.get<Equipos[]>(this.baseUrl));
      // Mapea los equipos y transforma la imagen Base64 en una URL de datos

        this.equiposList = response?.map(equipo => ({
          ...equipo,

          fotoEquipoBase64: equipo.fotoEquipoBase64
            ? `data:image/png;base64,${equipo.fotoEquipoBase64}`
            : 'assets/campo.png' // Imagen por defecto si no hay foto
        })) ?? [];
        console.log('Equipos cargados correctamente:', this.equiposList);

      return this.equiposList;

    } catch (e) {
      return [];
    }
  }

  async addEquipos(formData:FormData):Promise<Equipos | null> {
    try{
      const response = await firstValueFrom(this.http.post<Equipos>(this.baseUrl, formData));
      this.equiposList.push(response);
      return response;
    }catch(e){
      console.error('Error al agregar equipo', e);
      return null;
    }
  }
  async updateEquipo(id: number, formData: FormData): Promise<Equipos | null> {
    try {
      const response = await firstValueFrom(this.http.put<Equipos>(`${this.baseUrl}/${id}`, formData));
      const updateEquipo = this.equiposList.findIndex(equipo => equipo.id === id);
      if (updateEquipo !== -1) {
        this.equiposList[updateEquipo] = { ...this.equiposList[updateEquipo], ...response };
      }
      console.log('Persona actualizada correctamente:', response);
      return response;
    } catch (error) {
      console.error('Error al actualizar equipo:', error);
      return null;
    }
  }
  async deleteEquipo(id: number): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
      this.equiposList = this.equiposList.filter(equipo => equipo.id!== id);
      console.log('Equipo eliminado correctamente:', id);
    } catch (error) {
      console.error('Error al eliminar equipo:', error);
    }
  }
  async getEquipoById(id: number): Promise<Equipos> {
    try {
      const equipo = await firstValueFrom(this.http.get<Equipos>(`${this.baseUrl}/${id}`));

      // Verifica si la API devolvió el equipo correctamente
      if (!equipo) {
        console.error('El equipo no existe o hubo un error.');
        return {} as Equipos;
      }
      // Transformar la imagen Base64 en una URL de datos
      equipo.fotoEquipoBase64 = equipo.fotoEquipoBase64
        ? `data:image/png;base64,${equipo.fotoEquipoBase64}`
        : 'assets/campo.png'; // Imagen por defecto si no hay foto

      console.log('Equipo traído correctamente:', equipo);
      return equipo;

    } catch (e) {
      console.error('Error al traer el equipo');
      return {} as Equipos;
    }
  }

  getLocalEquipos(): Equipos[] {
    return this.equiposList;
  }
}
