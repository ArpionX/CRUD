import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Equipos } from '../../../interfaces/equipos';
import { Partidos } from '../../../interfaces/partidos';
import { Resultados } from '../../../interfaces/resultados';
import { EquiposService } from '../../../services/equipos.service';
import { PartidosService } from '../../../services/partidos.service';
import { ResultadosService } from '../../../services/resultados.service';

@Component({
  selector: 'app-gestion',
  imports: [ReactiveFormsModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {
  //-------------------------------PARTIDOS SERVICE--------------------------------
  partidosList: Partidos[]=[];
  partidosService: PartidosService = inject(PartidosService);
  idPartidoSeleccionado:number| null = null;
  partido:Partidos ={
    id: 0,
    fecha: '',
    hora: '',
    equipoLocalId: '',
    equipoVisitanteId: ''
  }
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
  partidoId: number = 0;
  estado:boolean = false;
  //-------------------------------EQUIPOS SERVICE--------------------------------
  equiposList:Equipos[] = [];
  equiposService:EquiposService = inject(EquiposService);
  equipoLocal:Equipos = {
    id: 0,
    nombreEquipo: '',
    facultad: '',
    fotoEquipoBase64: ''
  };
  equipoVisitante:Equipos = {
    id: 0,
    nombreEquipo: '',
    facultad: '',
    fotoEquipoBase64: ''
  };
  //-------------------------------RESULTADOS SERVICE--------------------------------
  resultadosList: Resultados[] = [];
  resultadosService: ResultadosService = inject(ResultadosService);
  resultadoId:number = 0;
  resultado:Resultados = {
    id: 0,
    equipoLocalId: 0,
    equipoVisitanteId: 0,
    golesLocal: 0,
    golesVisitante: 0,
    partidoId: 0,
    estadoResultado: false
  }
//-----------------------------animacion----------------------------------
  isMenuOpen:boolean = false;
  hasMenuOpened:boolean = false;
  isAnimating:boolean = false;
//-----------------------------menuFlotante----------------------------------
  menuFlotante:boolean = false;

//-----------------------------modalEliminar----------------------------------
  modalEliminar:boolean = false;
  modalId:number = 0;
//-----------------------------modalResultado----------------------------------
  modalResultado:boolean = false;
  modalEditResultado:boolean = false;
  //BOTON DE ABRIR MENU DE AGREGAR EQUIPO
  toggleMenu():void{
    if (this.isAnimating) {
      return; // Si ya está animando, no hacer nada
    }

    this.isAnimating = true;  // Inicia la animación

    if (!this.isMenuOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }

    // Para evitar el bucle o fallos, permitimos cambios después de un pequeño retraso
      this.isAnimating = false;
     // Ajusta el tiempo según la duración de la animación
  }
  openMenu():void{
    this.isMenuOpen = true;
    this.hasMenuOpened = true;
  }
  closeMenu():void{
    this.isMenuOpen = false;
  }

  //FORMULARIOS PARTIDOS AGREGADOS ----------------------------------------------------------------
  formularioPartidos = new FormGroup({
    fecha: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
    equipoLocalId: new FormControl('', Validators.required),
    equipoVisitanteId: new FormControl('', Validators.required)
  })
  //FORMULARIO UPDATE PARTIDOS----------------------------------------------------------------
  formularioUpdatePartidos = new FormGroup({
    fecha: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
    equipoLocalId: new FormControl('', Validators.required),
    equipoVisitanteId: new FormControl('', Validators.required)
  })
  //FORMULARIO RESULTADOS----------------------------------------------------------------
  formularioResultados = new FormGroup({
    golesLocal: new FormControl(0, Validators.required),
    golesVisitante: new FormControl(0, Validators.required),
    equipoLocalId: new FormControl(0, Validators.required),
    equipoVisitanteId: new FormControl(0, Validators.required)
  })
  //FORMULARIO UPDATE RESULTADOS-----------------------------------------------------------
  formularioUpdateResultados = new FormGroup({
    golesLocal: new FormControl(0, Validators.required),
    golesVisitante: new FormControl(0, Validators.required),
    equipoLocalId: new FormControl(0, Validators.required),
    equipoVisitanteId: new FormControl(0, Validators.required)
  })
  //funciones add/delete/update/get
  async ngOnInit(){
    this.resultadosList = await this.resultadosService.getResultados();
    this.partidosList = await this.partidosService.getPartidos();
    this.equiposList = await this.equiposService.getEquipos();
    console.log(this.partidosList);
  }
  async agregarPartido(){
    //Transformar la imagen a FormData para poder enviarla al backend
    const nuevoPartido: Partidos = {
      id:0,
      fecha: this.formularioPartidos.value.fecha?.toString() ?? '',
      hora: this.formularioPartidos.value.hora?.toString() ?? '',
      equipoLocalId: this.formularioPartidos.value.equipoLocalId?.toString() ?? '',
      equipoVisitanteId: this.formularioPartidos.value.equipoVisitanteId?.toString() ?? ''
    }
    await this.partidosService.addPartidos(nuevoPartido);
    this.formularioPartidos.reset();
    this.actualizar();
  }
  async editar(id:number){
    const partidoUpdate:Partidos ={
      id: id,
      fecha: this.formularioUpdatePartidos.value.fecha ?? '',
      hora: this.formularioUpdatePartidos.value.hora ?? '',
      equipoLocalId: this.formularioUpdatePartidos.value.equipoLocalId ?? '',
      equipoVisitanteId: this.formularioUpdatePartidos.value.equipoVisitanteId ?? ''
    };

    await this.partidosService.updatePartido(id, partidoUpdate);
    this.formularioUpdatePartidos.reset();
    this.cerrarMenu();
    this.actualizar();
  }
  async deletePartidos(id:number){
  await this.partidosService.deletePartido(id);
  this.actualizar();
  this.cerrarModalEliminar();
  }
  openModalEliminar(id:number):void{
    if(this.modalEliminar){
      this.modalEliminar = false;
    }else{
      this.modalId = id;
      this.modalEliminar = true;
    }
  }
  cerrarModalEliminar():void{
    this.modalEliminar = false;
  }
  async actualizar():Promise<void>{
    this.partidosList = await this.partidosService.getPartidos();
    this.resultadosList = await this.resultadosService.getResultados();
  }
  aparecerMenu(id:number):void{
    this.idPartidoSeleccionado = Number(id);
    this.formularioUpdatePartidos.reset();
    if(this.menuFlotante === false){
      this.menuFlotante = true;
      document.body.style.overflow = 'hidden';
    }else{
      this.menuFlotante = false;
      document.body.style.overflow = '';
    }

  }
  cerrarMenu(): void {
    this.menuFlotante = false;
    this.idPartidoSeleccionado = null;
    document.body.style.overflow = '';
  }
  buscarNombreEquipo(id: string): string {
    const idNumber = parseInt(id, 10); // Convierte el string a número
    const equipo = this.equiposList.find(equipo => equipo.id === idNumber);
    return equipo?.nombreEquipo ?? '';
  }
  buscarEquipo(id: number): Equipos | undefined {
    const equipo = this.equiposList.find(equipo => equipo.id === id);
    return equipo;
  }
  cerrarModalResultado(){
    if(this.modalResultado){
      this.modalResultado = false;
    }else{
      this.modalResultado = true;
    }
  }
  abrirModalResultado(id: number) {
    this.partidoId = id;
    this.resultado = this.resultadosList.find(resultado => resultado.id === id) ?? {id:0, equipoLocalId: 0, equipoVisitanteId: 0, golesLocal: 0, golesVisitante: 0,partidoId:0, estadoResultado: false};
    this.partido = this.partidosList.find(partido => partido.id === id) ?? {id:0, fecha: '', hora: '', equipoLocalId: '', equipoVisitanteId: ''};
    const equipolocalId = parseInt(this.partido.equipoLocalId);
    const equipoVisitanteId = parseInt(this.partido.equipoVisitanteId);
    this.equipoLocal = this.buscarEquipo(equipolocalId ?? 0) ?? { id: 0, nombreEquipo: 'Desconocido', facultad: 'Desconocido', fotoEquipoBase64: '' };
    this.equipoVisitante = this.buscarEquipo(equipoVisitanteId ?? 0) ?? { id: 0, nombreEquipo: 'Desconocido', facultad: 'Desconocido', fotoEquipoBase64: '' };
    this.formularioUpdateResultados.patchValue(
      {
        golesLocal: this.resultado.golesLocal,
        golesVisitante: this.resultado.golesVisitante,
        equipoLocalId: this.equipoLocal.id,
        equipoVisitanteId: this.equipoVisitante.id
      }
    );
    this.formularioResultados.patchValue(
      {
        golesLocal: this.resultado.golesLocal,
        golesVisitante: this.resultado.golesVisitante,
        equipoLocalId: this.equipoLocal.id,
        equipoVisitanteId: this.equipoVisitante.id
      }
    );
    if(this.modalResultado){
      this.modalResultado = false;
    }else{
      this.modalResultado = true;
    }
  }
  async agregarResultado(id: number) {
    const resultado: Resultados = {
      id: 0,
      equipoLocalId: this.formularioResultados.value.equipoLocalId ?? 0,
      equipoVisitanteId: this.formularioResultados.value.equipoVisitanteId ?? 0,
      golesLocal: this.formularioResultados.value.golesLocal ?? 0,
      golesVisitante: this.formularioResultados.value.golesVisitante ?? 0,
      partidoId:this.partidoId,
      estadoResultado: true
    }

    await this.resultadosService.addResultados(resultado);

    this.actualizar();
    this.cerrarModalResultado();
  }
  async editResultado(id: number){
    console.log(id)
    if(this.modalEditResultado){
      this.modalEditResultado = false;
    }else{
      this.modalEditResultado = true;
    }

    const nuevoResultado: Resultados = {
      id: id,
      equipoLocalId: this.formularioUpdateResultados.value.equipoLocalId ?? 0,
      equipoVisitanteId: this.formularioUpdateResultados.value.equipoVisitanteId ?? 0,
      golesLocal: this.formularioUpdateResultados.value.golesLocal ?? 0,
      golesVisitante: this.formularioUpdateResultados.value.golesVisitante ?? 0,
      partidoId: this.partidoId,
      estadoResultado: this.resultado.estadoResultado
    }
    await this.resultadosService.updateResultados(id, nuevoResultado);
    this.equipoLocal = this.buscarEquipo(this.resultado?.equipoLocalId ?? 0) ?? { id: 0, nombreEquipo: 'Desconocido', facultad: 'Desconocido', fotoEquipoBase64: '' };
    this.equipoVisitante = this.buscarEquipo(this.resultado?.equipoVisitanteId ?? 0) ?? { id: 0, nombreEquipo: 'Desconocido', facultad: 'Desconocido', fotoEquipoBase64: '' };
    this.actualizar();
    this.cerrarModalResultado();
  }
}


