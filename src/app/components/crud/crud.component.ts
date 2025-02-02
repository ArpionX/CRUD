import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Persona } from '../../../interfaces/persona';
import { PersonaServiceService } from '../../../services/persona-service.service';
@Component({
  selector: 'app-crud',
  imports: [ ReactiveFormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {
  personaList: Persona[]=[]
  personaService: PersonaServiceService = inject(PersonaServiceService);
  filteredPersonaList: Persona[] = [];

  formularioEstudiante = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    materia: new FormControl('', [Validators.required, Validators.minLength(5)])
  })
  formularioUpdateEstudiante = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    materia: new FormControl('', [Validators.required, Validators.minLength(5)]),
    id: new FormControl('', Validators.required)
  })
  constructor(){}
  async ngOnInit(){
    this.personaList = await this.personaService.getPersonas();
    this.filteredPersonaList = this.personaList;
  }
  async filterResult(nombre:string){

    if(!nombre){
        this.filteredPersonaList = this.personaService.getLocalPersonas();
    }
    this.filteredPersonaList = this.personaService.getLocalPersonas();
    this.filteredPersonaList =this.filteredPersonaList.filter(personas => personas?.nombre.toLowerCase().includes(nombre.toLowerCase()))??[];
    ;
  }
  async agregarEstudiante(){
    const nuevaPersona:Persona= {
      id: 0,
      nombre: this.formularioEstudiante.value.nombre ?? '',
      email: this.formularioEstudiante.value.email ?? '',
      materia: this.formularioEstudiante.value.materia?? ''
    }
    await this.personaService.addPersonas(nuevaPersona);
    await this.actualizar();
  }

  async eliminarEstudianteEspecial(id:number){
      await this.personaService.deletePersonas(id);
      await this.actualizar();

  }

  async editarEstudiante(id:number){
    const nuevaPersona:Persona= {
      id: this.personaList.length+1,
      nombre: this.formularioEstudiante.value.nombre ?? '',
      email: this.formularioEstudiante.value.email ?? '',
      materia: this.formularioEstudiante.value.materia?? ''
    }
    await this.personaService.updatePersona(id, nuevaPersona);
    await this.actualizar()
  }
  async actualizar(): Promise<void> {
    await this.personaService.getPersonas();
    this.filteredPersonaList = this.personaService.getLocalPersonas();
  }

  title = 'js_proyects';
  saludar(){
    console.log('Hola Mundo!');
  }
  dobleclick(){
    alert('Has dado doble click!');
  }
  cargositio(){
    console.log('se scroleo')
  }
  definirTimeOut(){
    setTimeout(() => {
      this.saludar();
      this.intervaloTimeout();
    }, 5000);
  }
  intervaloTimeout(){
    setInterval(() => {
      this.saludar();
    }, 1000);
  }
  resize(){
    window.addEventListener('resize', () => {
      console.log('Se ha redimensionado la pantalla');
    })
  }
}
