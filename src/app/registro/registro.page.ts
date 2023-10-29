import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  @ViewChild('nombreInput', { read: ElementRef }) nombreInputRef!: ElementRef;
  @ViewChild('apellidoInput', { read: ElementRef }) apellidoInputRef!: ElementRef;
  @ViewChild('fechaInput', { read: ElementRef }) fechaInputRef!: ElementRef;

  nivelEducacion: string = 'Basica';
  nombre: string = '';
  apellido: string = '';
  fecha: string = '';
  regiones: Region[] = [];
  comunas: Comuna[] = [];
  regionSel: number = 0;
  comunaSel: number = 0;
  seleccionComuna: boolean = true;

  constructor(
    private navCtrl: NavController,
    private animationCtrl: AnimationController,
    private helper: HelperService,
    private locationService: LocationService,
  ) {}

  ngOnInit() {
    this.cargarRegion();
    this.cargarDatosGuardados(); // Cargar datos previamente guardados al cargar la página
  }

  async cargarRegion() {
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna() {
    this.seleccionComuna = false;
    const req = await this.locationService.getComuna(this.regionSel);
    this.comunas = req.data;
  }

  async guardarDatosLocalmente() {
    const datosRegistro = {
      nivelEducacion: this.nivelEducacion,
      nombre: this.nombre,
      apellido: this.apellido,
      fechaNacimiento: this.fecha,
    };
  
    localStorage.setItem('datosRegistro', JSON.stringify(datosRegistro));
  }
  
  async cargarDatosGuardados() {
    const datosRegistro = localStorage.getItem('datosRegistro');
  
    if (datosRegistro) {
      const datos = JSON.parse(datosRegistro);
      this.nivelEducacion = datos.nivelEducacion;
      this.nombre = datos.nombre;
      this.apellido = datos.apellido;
      this.fecha = datos.fechaNacimiento;
    };

    await Storage['set']({
      key: 'datosRegistro', // Nombre único para identificar los datos
      value: JSON.stringify(datosRegistro),
    });
  }

  registrarUsuario() {
    this.guardarDatosLocalmente(); // Guardar datos antes de registrar el usuario
      this.navCtrl.navigateBack('/home');
      this.comprobarDatosAlmacenados();

    }
    // Resto de tu lógica para registrar el usuario
  

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

    await Promise.all([animationNombre.play(), animationApellido.play()]);

    this.nivelEducacion = 'Basica';
    this.nombre = '';
    this.apellido = '';
    this.fecha = '';
  }

  async comprobarDatosAlmacenados() {
    const { value } = await Storage['get']({ key: 'datosRegistro' });
  
    if (value) {
      console.log('Datos almacenados localmente:', JSON.parse(value));
    } else {
      console.log('No se encontraron datos almacenados localmente.');
    }
  }  
}
