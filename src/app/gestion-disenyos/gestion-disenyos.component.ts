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
import { Artista, ArtistaSinMap, ArtistasMap2 } from '../POJOs/artistas';
import { DisenyoEstilos } from '../POJOs/disenyo-estilos';
import { DisenyosEstilosService } from '../service/disenyos-estilos.service';
import { ArtistasService } from '../service/artistas.service';

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

  newDisenyo: Disenyo = {
    idDisenyo: 0,
    imgDisenyo: '',
    descrip: '',
    idArtista: 0,
    fechaCreacion: undefined
  };

  newEstiloDisenyo: DisenyoEstilos = {
    idDisenyo: 0,
    idEstilo: 0
  }
  newEstiloDisenyo2: DisenyoEstilos = {
    idDisenyo: 0,
    idEstilo: 0
  }
  artista: Artista = {
    idArtista: 0,
    nombre: '',
    apellido: '',
    alias: '',
    ciudad: '',
    foto: ''
  }

  arrEstilos: Estilos[] = [];
  arrDisenyos: Disenyo[] = [];
  arrDisenyosEstilos: number[] = [];

  selectedFile: File | "" = "";
  datePipe: DatePipe = inject(DatePipe);
  tokenNull = false;
  rol: string = '';

  disenyoService: DisenyosService = inject(DisenyosService);
  estilosDisenyoService: DisenyosEstilosService = inject(DisenyosEstilosService);
  estilosService: EstilosService = inject(EstilosService);

  disenyos: Disenyo[] = [];
  logService: LoginService = inject(LoginService);
  artiService: ArtistasService = inject(ArtistasService);

  constructor() {
    console.log("asdad");
    const idtemp = parseInt(localStorage.getItem("id") ?? "0");
    console.log("este es el inicio de sesion ", idtemp);
    this.rol = localStorage.getItem("rol") ?? "0";
    this.cargarArtistaPorIdUsuario(idtemp);
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == "") {
      this.tokenNull = false;
    } else {
      this.tokenNull = true;
    }
    this.cargarEstilos();
  }


  cargarDisenyosById(id: number) {
    this.disenyoService.getAllArtistasByIdArtista(id).subscribe((data: any) => {
      this.arrDisenyos = new DisenyosMap().get(data);

      for (let item of this.arrDisenyos) {
        item.imgDisenyo = `http://localhost:3000${item.imgDisenyo}`;

      }
    });
  }

  cargarArtistaPorIdUsuario(idUsuario:number){
    console.log("buscamos ete id " +  idUsuario );
    this.artiService.getAllArtistasByIdUsuario(idUsuario).subscribe((data: any) => {
      this.artista = new ArtistasMap2().get(data)[0];
      console.log("lide... aca tamo " + this.artista.idArtista);
      this.cargarDisenyosById(this.artista.idArtista);
    });

  }


  cargarEstilos() {
    console.log("console");
    this.estilosService.getAllEstilos().subscribe((data: any) => {
      console.log("console");
      this.arrEstilos = new EstilosMap().get(data);
    });
  }

  cambiarFiltro(Id: number) {

  }

  enviarDisenyo() {
    console.log("Preparando FormData...");
    this.newDisenyo.idArtista = parseInt(localStorage.getItem("id") ?? "48");
    console.log("AÇO QUE ES?? PUES LO BO JAJAJA" + this.newDisenyo.idArtista);

    if (!this.selectedFile) {
      console.error("No se seleccionó ninguna imagen.");
      return;
    }
    console.log(this.arrDisenyosEstilos, this.arrDisenyosEstilos[1]);

    //preparamos el formData
    const formData = new FormData();
    //al formdata le metemos el objeto artista
    formData.append('disenyo', JSON.stringify(this.newDisenyo));
    //al formData le metemos la imagen
    formData.append('image', this.selectedFile);
    formData.append('estilos', JSON.stringify(this.arrDisenyosEstilos));

    //nada, aqui todo normal, llamamos a nuestro querido observable donde le pasamos el formdata en vez de un obejto
    this.disenyoService.postDisenyo(formData).subscribe({
      next: (response: any) => {
        console.log("disenyo añadido con éxito:", response);
        this.anyadirAEstilosDisenyos();
        console.log("MONDONGO");

        this.vaciarDisenyo();
        const idtemp = parseInt(localStorage.getItem("id") ?? "0");
        this.cargarDisenyosById(idtemp);
      },
      error: (err: any) => {
        console.error("Error al añadir artista:", err);
      },
    });
  }

  anyadirAEstilosDisenyos() {
    console.log("entramos aqui");
    this.estilosDisenyoService.addDisenyosEstilos(this.newEstiloDisenyo).subscribe((data: any) => {
      console.log("entramos aqui2");

      if (this.newEstiloDisenyo2.idEstilo != 0) {
        console.log("entramos aqui3");

        this.estilosDisenyoService.addDisenyosEstilos(this.newEstiloDisenyo2).subscribe();
      }
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
