import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-estudiante',
  imports: [NgOptimizedImage, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {
  isMenuOpen:boolean = false;
  hasMenuOpened:boolean = false;
  isAnimating:boolean = false;
  a = ''
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
    setTimeout(() => {
      this.isAnimating = false;
    }, 300); // Ajusta el tiempo según la duración de la animación
  }
  openMenu():void{
    this.isMenuOpen = true;
    this.hasMenuOpened = true;
    ;
  }
  closeMenu():void{
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

}


