import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  template: `
  <div class="flex w-full h-screen  ">

    <section class="w-sm h-80 m-auto flex flex-col items-center justify-center box-shadow  rounded-2xl">
      <a routerLink="/admin/home" class="w-48 my-10 p-2 rounded-2xl bg-blue-500 text-amber-50 text-center" type="button" >Ingreso Administrador</a>
      <a routerLink="/estudiante/inicio" class="w-48 my-10 p-2 rounded-2xl bg-blue-500 text-amber-50 text-center" type="button">Ingreso Estudiante</a>
    </section>

  </div>

  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() login = new EventEmitter<boolean>()
  constructor(){}

}
