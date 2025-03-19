import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Jugadores } from '../../../interfaces/jugadores';
import { EquiposService } from '../../../services/equipos.service';
import { JugadoresService } from '../../../services/jugadores.service';

@Component({
  selector: 'app-jugadores',
  imports: [ ReactiveFormsModule],
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent {
  jugadoresList: Jugadores[] = [];
  jugadoresService: JugadoresService = inject(JugadoresService);
  jugadoresFiltrados: Jugadores[] = [];
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

  route:ActivatedRoute = inject(ActivatedRoute);
  equipoId: number = 0;
  equipoNombre: string = '';
  equipoFoto: string = '';
  equiposService:EquiposService = inject(EquiposService);
  imagen: File | null = null;
  valoracion:number = 0;

  isMenuOpen: boolean = false;
  hasMenuOpened: boolean = false;
  isAnimating: boolean = false;
  menuFlotante: boolean = false;

  idJugadorSeleccionado: number | null = null;
  modalEliminar: boolean = false;
  modalId: number = 0;

  // BOTÓN DE ABRIR MENU DE AGREGAR JUGADOR
  toggleMenu(): void {
    if (this.isAnimating) return; // Si ya está animando, no hacer nada

    this.isAnimating = true; // Inicia la animación
    this.isMenuOpen ? this.closeMenu() : this.openMenu();
    this.isAnimating = false; // Permite cambios tras la animación
    this.formularioJugadores.reset();
  }

  openMenu(): void {
    this.isMenuOpen = true;
    this.hasMenuOpened = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // FUNCIÓN PARA SELECCIONAR IMAGEN
  seleccionarImagen(event: any): void {
    const file = event.target.files[0];
    if (file) this.imagen = file;
  }

  // FORMULARIOS
  formularioJugadores = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    numeroCamisa: new FormControl(0, [Validators.required, Validators.min(1)]),
    posicion: new FormControl('', Validators.required),
    equipoId: new FormControl({ value: 0, disabled: true }, Validators.required),
    foto: new FormControl('', Validators.required),
  });

  formularioUpdateJugadores = new FormGroup({
    id: new FormControl<number>({ value: 0, disabled: true }, Validators.required),
    nombre: new FormControl('', Validators.required),
    numeroCamisa: new FormControl(0, [Validators.required, Validators.min(1)]),
    posicion: new FormControl('', Validators.required),
    equipoId: new FormControl({value: 0,disabled:true}, Validators.required),
    foto: new FormControl('', Validators.required),
  });

  // FUNCIONES ADD/DELETE/UPDATE/GET
  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.equipoId = Number(params['id']);
    })
    const equipo = await this.equiposService.getEquipoById(this.equipoId);
    this.formularioJugadores.patchValue({
      equipoId: this.equipoId,
    });
    this.equipoNombre = equipo.nombreEquipo;
    this.equipoFoto = equipo.fotoEquipoBase64;
    this.jugadoresList = await this.jugadoresService.getJugadores();
    this.jugadoresFiltrados = await this.jugadoresList.filter(jugador => jugador.equipoId === this.equipoId);
  }

  async agregarJugador() {
    if (!this.formularioJugadores.valid || !this.imagen) {
      alert("Debe completar todos los campos y seleccionar una imagen.");
      return;
    }

    // Transformar la imagen a FormData para enviarla al backend
    const formData = new FormData();
    formData.append('nombre', this.formularioJugadores.value.nombre ?? '');
    formData.append('numeroCamisa', this.formularioJugadores.value.numeroCamisa?.toString() ?? '');
    formData.append('posicion', this.formularioJugadores.value.posicion ?? '');
    formData.append('archivo', this.imagen ?? '');
    formData.append('equipoId', this.equipoId.toString() ?? '');
    formData.append('valoracion', this.valoracion.toString() ?? '');

    await this.jugadoresService.addJugador(formData);
    this.formularioJugadores.reset();
    this.imagen = null;
    this.actualizar();
  }

  async editar(id: number) {
    const formData = new FormData();
    formData.append('nombre', this.formularioUpdateJugadores.value.nombre ?? '');
    formData.append('numeroCamisa', this.formularioUpdateJugadores.value.numeroCamisa?.toString() ?? '');
    formData.append('posicion', this.formularioUpdateJugadores.value.posicion ?? '');
    formData.append('archivo', this.imagen ?? '');


    await this.jugadoresService.updateJugador(id, formData);
    this.formularioUpdateJugadores.reset();
    this.cerrarMenu();
    this.actualizar();
  }

  async deleteJugador(id: number) {
    await this.jugadoresService.deleteJugador(id);
    this.actualizar();
    this.cerrarModalEliminar();
  }

  openModalEliminar(id: number): void {
    if (this.modalEliminar) {
      this.modalEliminar = false;
    } else {
      this.modalId = id;
      this.modalEliminar = true;
    }
  }

  cerrarModalEliminar(): void {
    this.modalEliminar = false;
  }

  async actualizar(): Promise<void> {
    this.jugadoresList = await this.jugadoresService.getJugadores();
    this.jugadoresFiltrados = await this.jugadoresList.filter(jugador => jugador.equipoId === this.equipoId);
  }

  aparecerMenu(id: number): void {
    this.idJugadorSeleccionado = Number(id);
    this.formularioUpdateJugadores.reset();
    this.formularioUpdateJugadores.patchValue({
      id: this.idJugadorSeleccionado,
    });

    if (!this.menuFlotante) {
      this.menuFlotante = true;
      document.body.style.overflow = 'hidden';
    } else {
      this.menuFlotante = false;
      document.body.style.overflow = '';
    }
  }

  cerrarMenu(): void {
    this.menuFlotante = false;
    this.idJugadorSeleccionado = null;
    document.body.style.overflow = '';
  }


}

