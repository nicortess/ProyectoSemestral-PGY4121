import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthHomeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('datosRegistro')) {
      return true; // Usuario registrado, permite el acceso a la página 'home'
    } else {
      this.router.navigate(['/registro']); // No hay usuario registrado, redirige a la página de registro
      return false;
    }
  }
}
