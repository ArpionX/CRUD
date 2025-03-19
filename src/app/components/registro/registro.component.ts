import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Equipos } from '../../../interfaces/equipos';
import { EquiposService } from '../../../services/equipos.service';
@Component({
  selector: 'app-registro',
  imports: [ ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  equiposList: Equipos[]=[];
  equiposService: EquiposService = inject(EquiposService);
  imagen: File | null = null;
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
  isMenuOpen:boolean = false;
  hasMenuOpened:boolean = false;
  isAnimating:boolean = false;

  menuFlotante:boolean = false;

  idEquipoSeleccionado:number| null = null;

  modalEliminar:boolean = false;
  modalId:number = 0;
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
  //FUNCION SELECCIONAR imagen
  seleccionarImagen(event: any):void{
    const file = event.target.files[0];
    if(file){
      this.imagen = file;
    }
  }
  //FORMULARIOS
  formularioEquipos = new FormGroup({
    nombre: new FormControl('', Validators.required),
    facultad: new FormControl('', Validators.required),
    foto: new FormControl(null, Validators.required),
  })
  formularioUpdateEquipos = new FormGroup({
    id: new FormControl<number>( {value:0, disabled:true}, Validators.required),
    nombre: new FormControl('', Validators.required),
    facultad: new FormControl('', Validators.required),
    foto: new FormControl('', Validators.required),
  })

  //funciones add/delete/update/get
  async ngOnInit(){
    this.equiposList = await this.equiposService.getEquipos();

  }
  async agregarEquipo(){
    if (!this.formularioEquipos.valid || !this.imagen) {
      alert("Debe completar todos los campos y seleccionar una imagen.");
      return;
    }
    //Transformar la imagen a FormData para poder enviarla al backend
    const formData= new FormData();
    formData.append('nombre', this.formularioEquipos.value.nombre ?? '');
    formData.append('facultad', this.formularioEquipos.value.facultad ?? '');
    formData.append('archivo', this.imagen);
    await this.equiposService.addEquipos(formData);
    this.formularioEquipos.reset();
    this.imagen = null;
    this.actualizar();
  }
  async editar(id:number){
    const formData = new FormData();
    formData.append('nombre', this.formularioUpdateEquipos.value.nombre ?? '');
    formData.append('facultad', this.formularioUpdateEquipos.value.facultad ?? '');
    formData.append('archivo', this.imagen ?? '');
    await this.equiposService.updateEquipo(id, formData);
    this.formularioUpdateEquipos.reset();
    this.cerrarMenu();
    this.actualizar();
  }
  async deleteEquipos(id:number){
  await this.equiposService.deleteEquipo(id);
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
    this.equiposList = await this.equiposService.getEquipos();
  }
  aparecerMenu(id:number):void{
    this.idEquipoSeleccionado = Number(id);
    this.formularioUpdateEquipos.reset();
      this.formularioUpdateEquipos.patchValue({
        id: this.idEquipoSeleccionado,

      });
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
    this.idEquipoSeleccionado = null;
    document.body.style.overflow = '';
  }


}
