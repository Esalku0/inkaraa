import { Component, inject } from '@angular/core';
import { Reserva } from '../POJOs/reservas';
import { ReservasService } from '../service/reservas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarrouselImagenesComponent } from '../carrousel-imagenes/carrousel-imagenes.component';

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

  idUsuario: number = Number(localStorage.getItem("idUsuario"));
  myDate = new Date();

  newReserva: Reserva = {
    idReserva: 0,
    idArtista: 0,
    idCliente: this.idUsuario,
    fechaReserva: this.myDate,
    detalles: '',
    boceto: '',
    idEstado: 0
  }

  reservaService: ReservasService = inject(ReservasService);

  constructor() {

  }

  anyadirReserva() {

  }

  cargarArtistas(){
    
  }
}
