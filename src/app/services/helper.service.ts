import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private alertService:AlertController) { }

  sumar(n1:number,n2:number){
    var resultado = n1 + n2;
    return resultado;
  }


  async showAlert(msg:string,title:string){
      var alert = await this.alertService.create({cssClass:"alertClass",message:msg,header:title,buttons:['Aceptar']})
      await alert.present();
      return alert;
  }


}
