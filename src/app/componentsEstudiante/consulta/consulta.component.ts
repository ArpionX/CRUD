import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Equipos } from '../../../interfaces/equipos';
import { EquiposService } from '../../../services/equipos.service';

@Component({
  selector: 'app-consulta',
  imports: [RouterLink],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent {
  equiposList:Equipos[] = [];
  equiposService:EquiposService = inject(EquiposService);
  equiposListData:Equipos[] = [
    {
      id: 1,
      nombreEquipo: 'Equipo 1',
      facultad: 'Facultad 1',
      fotoEquipoBase64: 'assets/imagenesEquipos/escudo.png'
    },
    {
      id: 2,
      nombreEquipo: 'Equipo 2',
      facultad: 'Facultad 2',
      fotoEquipoBase64: 'assets/imagenesEquipos/Emelec.png'
    },
    {
      id: 3,
      nombreEquipo: 'Equipo 3',
      facultad: 'Facultad 3',
      fotoEquipoBase64: 'assets/imagenesEquipos/Liga.png'
    }
  ];
  async ngOnInit(){
    this.equiposList = await this.equiposService.getEquipos();

  }
}
