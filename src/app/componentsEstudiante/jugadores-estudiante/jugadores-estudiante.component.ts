import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jugadores } from '../../../interfaces/jugadores';
import { EquiposService } from '../../../services/equipos.service';
import { JugadoresService } from '../../../services/jugadores.service';

@Component({
  selector: 'app-jugadores-estudiante',
  imports: [],
  templateUrl: './jugadores-estudiante.component.html',
  styleUrl: './jugadores-estudiante.component.css'
})
export class JugadoresEstudianteComponent {
  //JUGADORES
  jugadoresList:Jugadores[] = [];
  jugadoresService:JugadoresService = inject(JugadoresService);
  jugadoresListFilter:Jugadores[] = [];
  jugadoresListData: Jugadores[] = [
    {
      id: 1,
      nombre: 'Messi',
      numeroCamisa: 10,
      posicion: 'Delantero',
      fotoJugador: 'assets/imagenesJugadores/MESSI.jpg',
      equipoId: 1,
      valoracion: 98
    },
  {
    id: 2,
      nombre: 'Ronaldo',
      numeroCamisa: 9,
      posicion: 'Defensa',
      fotoJugador: 'assets/imagenesJugadores/ronaldo.jpg',
      equipoId: 1,
      valoracion: 95
    },
  {
    id: 3,
      nombre: 'Mbappe',
      numeroCamisa: 8,
      posicion: 'Medio',
      fotoJugador: 'assets/imagenesJugadores/mbappe.jpg',
      equipoId: 1,
      valoracion: 92
    },

  ]
  //OBTENER LA ID DE LA RUTA
  route:ActivatedRoute = inject(ActivatedRoute);

  //EQUIPO
  equiposService:EquiposService = inject(EquiposService);
  equipoNombre: string = '';
  equipoFoto: string = '';
  equipoId: number = 0;

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.equipoId = Number(params['id']);
    })

    const equipo = await this.equiposService.getEquipoById(this.equipoId);
    this.equipoNombre = equipo.nombreEquipo;
    this.equipoFoto = equipo.fotoEquipoBase64;
    this.jugadoresList = await this.jugadoresService.getJugadores();
    this.jugadoresListFilter = await this.jugadoresList.filter(jugador => jugador.equipoId === this.equipoId);
  }

}
