import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Persona } from '../interfaces/persona';
@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'https://67697dec863eaa5ac0dbd437.mockapi.io/api/v1/persona';
  protected personaList:Persona[] = [];
  constructor() { }

  async getPersonas(): Promise<Persona[]> {
    try {
        const response = await firstValueFrom(this.http.get<Persona[]>(this.baseUrl));
        this.personaList = response ?? [];
        return this.personaList;
    } catch (error) {
        console.log('Error fetching users:', error);
        this.personaList = [];
        return this.personaList;
    }
  }
  async getPersonasByName(nombre:string): Promise<Persona[]> {
    try{
      const personasFiltradas = this.personaList.filter(persona => persona.nombre === nombre)??[];
      return personasFiltradas;
    }
    catch (error) {
      console.error(`Error buscando persona con ID ${nombre}:`, error);
      return [];
    }
  }
  async deletePersonas(id: number): Promise<boolean> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
      const nuevaListaPersonas = this.personaList.filter(persona => persona.id !== id);
      this.personaList = nuevaListaPersonas ?? [];
      console.log('Persona eliminada correctamente:', id);
      return true;
    } catch (error) {
      console.error(`Error eliminando persona con ID ${id}:`, error);
      return false;
    }
  }

  async addPersonas(persona: Persona): Promise<Persona | null> {
    try {
      const response = await firstValueFrom(this.http.post<Persona>(this.baseUrl, persona));
      this.personaList.push(response);;
      console.log('Persona agregada correctamente:', response);
      return response;
    } catch (error) {
      console.error('Error agregando persona:', error);
      return null;
    }
  }
  async updatePersona(id: number, persona: Partial<Persona>): Promise<Persona | null> {
    try {
      const response = await firstValueFrom(this.http.put<Persona>(`${this.baseUrl}/${id}`, persona));
      const updatedPersona = this.personaList.findIndex(p => (p.id === id));
      if (updatedPersona !== -1) {
        this.personaList[updatedPersona] = { ...this.personaList[updatedPersona], ...response }
      };
      console.log('Persona actualizada correctamente:', response);
      return response;

    } catch (error) {
      console.error(`Error actualizando persona con ID ${id}:`, error);
      return null;
    }
  }
  getLocalPersonas(): Persona[] {
    return this.personaList;
  }

}
