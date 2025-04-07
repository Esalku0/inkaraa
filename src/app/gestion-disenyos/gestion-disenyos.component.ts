import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarrouselImagenesComponent } from '../carrousel-imagenes/carrousel-imagenes.component';
import { LoginService } from '../service/login.service';
import { Estilos, EstilosMap } from '../POJOs/estilos';
import { EstilosService } from '../service/estilos.service';
import { Disenyo, DisenyosMap } from '../POJOs/disenyos';
import { DisenyosService } from '../service/disenyos.service';
import { Artista } from '../POJOs/artistas';

@Component({
  selector: 'app-gestion-disenyos',
  imports: [CommonModule,
    FormsModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    CarrouselImagenesComponent],
  templateUrl: './gestion-disenyos.component.html',
  styleUrl: './gestion-disenyos.component.css'
})
export class GestionDisenyosComponent {
  selectedFile: File | "" = "";

  datePipe: DatePipe = inject(DatePipe);
  arrEstilos: Estilos[] = [];
  arrDisenyos: Disenyo[] = [];

  newDisenyo: Disenyo = {
    idDisenyo: 0,
    imgDisenyo: '',
    descrip: '',
    idArtista: 0,
    fechaCreacion: undefined
  };


  tokenNull = false;
  rol = '2';

  disenyoService: DisenyosService = inject(DisenyosService);

  constructor() {
    console.log("asdad");
    this.cargarDisenyos();
  }

  cargarDisenyos() {
    this.disenyoService.getAllDisenyos().subscribe((data: any) => {
      this.arrDisenyos = new DisenyosMap().get(data);
    });
  }


  cambiarFiltro(Id: number) {

  }

  enviarDisenyo() {
    console.log("Preparando FormData...");
    this.newDisenyo.idArtista= parseInt(localStorage.getItem("id")??"48");
    console.log("AÇO QUE ES?? PUES LO BO JAJAJA" + this.newDisenyo.idArtista);

    if (!this.selectedFile) {
      console.error("No se seleccionó ninguna imagen.");
      return;
    }
    //preparamos el formData
    const formData = new FormData();
    //al formdata le metemos el objeto artista
    formData.append('disenyo', JSON.stringify(this.newDisenyo));
    //al formData le metemos la imagen
    formData.append('image', this.selectedFile);

    //nada, aqui todo normal, llamamos a nuestro querido observable donde le pasamos el formdata en vez de un obejto
    this.disenyoService.postDisenyo(formData).subscribe({
      next: (response: any) => {
        console.log("disenyo añadido con éxito:", response);
        this.vaciarDisenyo();
      },
      error: (err: any) => {
        console.error("Error al añadir artista:", err);
      },
    });
  }



  onFileSelected(event: any): void {
    console.log("Evento detectado", event);
    console.log("pasa por aqui");
    this.selectedFile = event.target.files[0];
  }

  vaciarDisenyo() {
    this.newDisenyo = {
      idDisenyo: 0,
      imgDisenyo: '',
      descrip: '',
      idArtista: 0,
      fechaCreacion: undefined
    }
  }

  cerrarSesion() {

  }
}
