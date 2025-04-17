import { Component, inject } from '@angular/core';
import { Reserva } from '../POJOs/reservas';
import { ReservasService } from '../service/reservas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CarrouselImagenesComponent } from '../carrousel-imagenes/carrousel-imagenes.component';
import { ArtistasService } from '../service/artistas.service';
import { Artista, ArtistasMap } from '../POJOs/artistas';

@Component({
  selector: 'app-reserva-cita',
  imports: [CommonModule,
    FormsModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    CarrouselImagenesComponent],
  templateUrl: './reserva-cita.component.html',
  styleUrl: './reserva-cita.component.css'
})
export class ReservaCitaComponent {

  idUsuario: number = Number(localStorage.getItem("id"));
  myDate = new Date();

  newReserva: Reserva = {
    idReserva: 0,
    idArtista: 0,
    idCliente: this.idUsuario,
    fechaReserva: this.myDate,
    detalles: '',
    boceto: '',
    idEstado: 1
  }
  arrArtistas:Artista[]=[];

  artiService:ArtistasService=inject(ArtistasService);
  reservaService: ReservasService = inject(ReservasService);
  router: Router = inject(Router);

  selectedFile: File | "" = "";


  constructor() {

    if (localStorage.getItem("token") == null || localStorage.getItem("token") == "") {
      this.router.navigate(['/login']);
    }
    this.cargarArtistas();
  }

  onFileSelected(event: any): void {
    console.log("Evento detectado", event);
    console.log("pasa por aqui");
    this.selectedFile = event.target.files[0];
  }


  anyadirReserva() {


    const formData = new FormData();
    //al formdata le metemos el objeto artista
    formData.append('reservas', JSON.stringify(this.newReserva));
    //al formData le metemos la imagen
    formData.append('image', this.selectedFile);
    console.log("hola");

    this.reservaService.putReservas(formData).subscribe((data:any)=>{

      this.router.navigate(['/']);

        
    });
  }

  cargarArtistas() {
    this.artiService.getAllArtistas().subscribe((data:any)=>{
        this.arrArtistas=new ArtistasMap().get(data);
    },
    (error) => {
      if (error.status === 404) {
        console.warn("error");
      } else {
        console.error("Error ", error);
      }
    });
  }

}
