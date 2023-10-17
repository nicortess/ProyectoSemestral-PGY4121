import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  contrasenia: string = '';

  constructor(private navCtrl: NavController,private toastController: ToastController) {}

  async mostrarMensajeError() {
    const toast = await this.toastController.create({
      message: 'El nombre de usuario debe tener entre 3 y 8 caracteres. La contraseña debe contener 4 digitos numericos',
      duration: 3000, // Duración del mensaje en milisegundos
      position: 'top' // Posición del mensaje emergente
    });
    toast.present();
  }

  formularioValido(): boolean {
    const isNumericPassword = /^\d{4}$/.test(this.contrasenia); // Validar dígitos numéricos de longitud 4
    return this.usuario.length >= 3 && this.usuario.length <= 8 && isNumericPassword;
  }

  iniciarSesion() {
    if (this.formularioValido()) {
      this.navCtrl.navigateForward('/registro');
      console.log('Inicio de sesión exitoso');
    } else {
      this.mostrarMensajeError();
    }
  }
}