import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatosCompartidosService } from '../datos-compartidos.service';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  @ViewChild('nombreInput', { read: ElementRef }) nombreInputRef!: ElementRef;
  @ViewChild('apellidoInput', { read: ElementRef }) apellidoInputRef!: ElementRef;
  @ViewChild('fechaInput', { read: ElementRef }) fechaInputRef!: ElementRef;
  nivelEducacion: string = 'Basica';
  nombre: string = '';
  apellido: string = '';
  fecha: string = '';

  constructor(
    private navCtrl: NavController,
    private datosService: DatosCompartidosService,
    private animationCtrl: AnimationController
  ) {}

  registrarUsuario() {
    const nuevoUsuario = {
      nivelEducacion: this.nivelEducacion,
      nombre: this.nombre,
      apellido: this.apellido,
      fechaNacimiento: this.fecha,
    };

    this.datosService.agregarUsuario(nuevoUsuario);

    this.navCtrl.navigateBack('/home');
  }

  async limpiarCampos() {
    const nombreInput = this.nombreInputRef.nativeElement;
    const apellidoInput = this.apellidoInputRef.nativeElement;

    const animationNombre: Animation = this.animationCtrl
      .create()
      .addElement(nombreInput)
      .duration(600)
      .iterations(1)
      .fromTo('transform', 'translateX(0)', 'translateX(50px)');

    const animationApellido: Animation = this.animationCtrl
      .create()
      .addElement(apellidoInput)
      .duration(600)
      .iterations(1)
      .fromTo('transform', 'translateX(0)', 'translateX(50px)');

     

    await Promise.all([
      animationNombre.play(),
      animationApellido.play(),
    ]);

    // Limpieza posterior a la animación
    this.nivelEducacion = 'Basica';
    this.nombre = '';
    this.apellido = '';
    this.fecha = '';
  }
}