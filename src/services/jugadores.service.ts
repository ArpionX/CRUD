import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Jugadores } from '../interfaces/jugadores';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5014/api/Jugadores';
  protected jugadoresList:Jugadores[] = [];
  constructor() { }
  async getJugadores(): Promise<Jugadores[]> {
    try {
      const response = await firstValueFrom(this.http.get<Jugadores[]>(this.baseUrl));

      // Mapea los jugadores y transforma la imagen Base64 en una URL de datos
      this.jugadoresList = response?.map(jugador => ({
        ...jugador,
        fotoJugador: jugador.fotoJugador
          ? `data:image/png;base64,${jugador.fotoJugador}`
          : 'assets/campo.png' // Imagen por defecto si no hay foto
      })) ?? [];

      return this.jugadoresList;
    } catch (error) {
      return [];
    }
  }

  async addJugador(formData: FormData): Promise<Jugadores | null> {
    try {
      console.log('Contenido de FormData:');
      for (const pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      const response = await firstValueFrom(this.http.post<Jugadores>(this.baseUrl, formData));
      this.jugadoresList.push(response);
      return response;
    } catch (error) {
      console.error('Error al agregar jugador', error);
      return null;
    }
  }

  async updateJugador(id: number, formData: FormData): Promise<Jugadores | null> {
    try {
      const response = await firstValueFrom(this.http.put<Jugadores>(`${this.baseUrl}/${id}`, formData));
      const index = this.jugadoresList.findIndex(jugador => jugador.id === id);

      if (index !== -1) {
        this.jugadoresList[index] = { ...this.jugadoresList[index], ...response };
      }

      console.log('Jugador actualizado correctamente:', response);
      return response;
    } catch (error) {
      console.error('Error al actualizar jugador:', error);
      return null;
    }
  }
  async deleteJugador(id: number): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
      this.jugadoresList = this.jugadoresList.filter(jugador => jugador.id !== id);
      console.log('Jugador eliminado correctamente:', id);
    } catch (error) {
      console.error('Error al eliminar jugador:', error);
    }
  }

  getLocalJugadores(): Jugadores[] {
    return this.jugadoresList;
  }
}
