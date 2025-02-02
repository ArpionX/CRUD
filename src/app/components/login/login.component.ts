import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  template: `
  <p>login works</p>
      <div>
        <form ></form>
        <label for="username">Username</label>
        <input type="text" id="username" name="username">
        <label for="password">Contraseña</label>
        <input type="text" id="password" name="password">
      </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() login = new EventEmitter<boolean>()
  constructor(){}

}
