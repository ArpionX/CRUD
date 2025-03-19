import { Component } from '@angular/core';
import { Posiciones } from '../../../interfaces/posiciones';
import { PosicionesService } from '../../../services/posiciones.service';

@Component({
  selector: 'app-posiciones',
  imports: [],
  templateUrl: './posiciones.component.html',
  styleUrl: './posiciones.component.css'
})
export class PosicionesComponent {
  posicionesLits: Posiciones[] = [];
  posicionesListData: Posiciones[] = [
    {
      nombreEquipo: 'Ecuador',
      partidosJugados: 1,
      partidosGanados: 2,
      partidosEmpatados: 3,
      partidosPerdidos: 4,
      puntos: 10
    },
    {
      nombreEquipo: 'Chile',
      partidosJugados: 2,
      partidosGanados: 1,
      partidosEmpatados: 3,
      partidosPerdidos: 4,
      puntos: 8
    },
    {
      nombreEquipo: 'Argentina',
      partidosJugados: 3,
      partidosGanados: 3,
      partidosEmpatados: 3,
      partidosPerdidos: 4,
      puntos: 15
    },
    {
      nombreEquipo: 'Brasil',
      partidosJugados: 4,
      partidosGanados: 4,
      partidosEmpatados: 3,
      partidosPerdidos: 4,
      puntos: 20
    }
  ];
  posicionesServices:PosicionesService = new PosicionesService();
  async ngOnInit(): Promise<void> {
    this.posicionesLits = await this.posicionesServices.getPosiciones();
  }
}
