import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AuthGoogle } from '../../services/auth-google';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  perfil$;

  constructor(private authGoogle: AuthGoogle) {
    this.perfil$ = this.authGoogle.perfil$;
  }

  estaAutenticado(): boolean {
    return this.authGoogle.estaAutenticado();
  }

  cerrarSesion() {
    this.authGoogle.logout();
  }
}
