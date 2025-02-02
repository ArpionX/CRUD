import { Component, Input } from '@angular/core';
import { Persona } from '../../../interfaces/persona';

@Component({
  selector: 'app-persona',
  imports: [],
  template: `
    <td >{{persona.id}}</td>
    <td>{{persona.nombre}}</td>
    <td>{{persona.email}}</td>
    <td>{{persona.materia}}</td>

  `,
  styleUrl: './persona.component.css'
})
export class PersonaComponent {
  @Input() persona!:Persona;
}


