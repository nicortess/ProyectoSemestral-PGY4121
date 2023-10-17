import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosCompartidosService {
  usuarios: any[] = [];

  agregarUsuario(usuario: any) {
    this.usuarios.push(usuario);
  }

  obtenerUsuarios() {
    return this.usuarios;
  }

  limpiarUsuarios() {
    this.usuarios = [];
  }
}


