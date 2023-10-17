import { Component, HostListener, OnInit  } from '@angular/core';
import { DatosCompartidosService } from '../datos-compartidos.service';
import { BarcodeScanner, ScanResult } from 'capacitor-barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  isSupported = false;
  usuarios: any[] = [];
  isTitleVisible = false;
  resultadoScan:any='';

  constructor(
    private datosService: DatosCompartidosService,

  ) {
    this.usuarios = datosService.obtenerUsuarios();
  }

  async scan() {
    try {
      const result: ScanResult = await BarcodeScanner.scan();
      if (result) {
        this.resultadoScan = result.toString();
        console.log("Resultado scan", this.resultadoScan);
      } else {
        console.error('No se escaneó ningún contenido o el usuario canceló el escaneo.');
      }
    } catch (error) {
      console.error('Error al escanear:', error);
    }
  }

  limpiarLista() {
    this.datosService.limpiarUsuarios();
    this.usuarios = [];
  }
  @HostListener('ionScroll', ['$event.target'])
  onScroll(event: any) {
    const scrollTop = event.scrollTop;
    const titleElement = document.querySelector('.animated-title') as HTMLElement;
    const titleHeight = titleElement.clientHeight;
    const halfTitleHeight = titleHeight / 2;

    this.isTitleVisible = scrollTop >= halfTitleHeight;
  }
}