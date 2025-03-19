import { Component } from '@angular/core';
import { Galeria } from '../../../interfaces/galeria';

@Component({
  selector: 'app-galeria',
  imports: [],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  galeriaList:Galeria[] = [
    {
      id: 1,
      titulo: 'Fotos de la casa',
      fotos: 'assets/type.png',
      descripcion: 'Fotos de la casa en vista panorámica'
    },
    {
      id: 2,
      titulo: 'Fotos del barrio',
      fotos: 'assets/futbolPortada.jpg',
      descripcion: 'Fotos del barrio en vista panorámica'
    },
    {
      id: 3,
      titulo: 'Fotos del trabajo',
      fotos: 'assets/linkedin.png',
      descripcion: 'Fotos del trabajo en vista panorámica'
    }
  ]
}
