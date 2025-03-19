import { Component, inject } from '@angular/core';
import { Equipos } from '../../../interfaces/equipos';
import { Partidos } from '../../../interfaces/partidos';
import { EquiposService } from '../../../services/equipos.service';
import { PartidosService } from '../../../services/partidos.service';

@Component({
  selector: 'app-calendario',
  imports: [],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {
  partidosList: Partidos[]=[];
  partidosService: PartidosService = inject(PartidosService);
  partidoListData:Partidos[] = [{
    id: 1,
    fecha: '2022-01-01',
    hora: '18:00',
    equipoLocalId: '1',
    equipoVisitanteId: '2'
  },
  {
    id: 2,
    fecha: '2022-01-02',
    hora: '20:00',
    equipoLocalId: '3',
    equipoVisitanteId: '4'
  },
  {
    id: 3,
    fecha: '2022-01-03',
    hora: '22:00',
    equipoLocalId: '5',
    equipoVisitanteId: '6'
  }];

  equiposList:Equipos[] = [];
  equiposService:EquiposService = inject(EquiposService);

  async ngOnInit() {
    this.partidosList = await this.partidosService.getPartidos();
    this.equiposList = await this.equiposService.getEquipos();

    // Ordenar los partidos por fecha y hora ascendente
    this.partidosList.sort((a, b) => {
      const fechaA = new Date(a.fecha + 'T' + a.hora); // Combinar fecha y hora
      const fechaB = new Date(b.fecha + 'T' + b.hora);
      return fechaA.getTime() - fechaB.getTime(); // Orden ascendente
    });
  }

  buscarNombreEquipo(id: string): string {
    const idNumber = parseInt(id, 10); // Convierte el string a número
    const equipo = this.equiposList.find(equipo => equipo.id === idNumber);
    return equipo?.nombreEquipo ?? '';
  }
}
