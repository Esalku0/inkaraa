
import { Component, inject } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../service/login.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router'; import { FormsModule } from '@angular/forms';
import interactionPlugin from '@fullcalendar/interaction';
import { PopupReservaComponent } from '../popup-reserva/popup-reserva.component';
import { Reserva, ReservasMap } from '../POJOs/reservas';
import { ReservasService } from '../service/reservas.service';
import { objEvento } from '../POJOs/eventoObligado';
@Component({
  selector: 'app-calendario',
  imports: [FullCalendarModule, CommonModule,
    FormsModule, MatIconModule,
    RouterLink,
    RouterOutlet, PopupReservaComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {

  newReserva: Reserva = {
    idReserva: 0,
    idArtista: 0,
    idCliente: 0,
    fechaReserva: new Date,
    detalles: '',
    boceto: '',
    idEstado: 0
  }


  showPopup = false;
  arrReservas: Reserva[] = [];
  arrEvents: objEvento[] = [];

  selectedFile: File | "" = "";
  tempPass: string = "";
  email: string = "";
  rol: string = '';

  logService: LoginService = inject(LoginService);
  router: Router = inject(Router);
  resService: ReservasService = inject(ReservasService);
  ENVIAR:number=7;
  constructor(private http: HttpClient) {
    this.rol = this.logService.getRol();
    console.log(this.rol);
    this.cargarReservas();
  }

  handleEventClick(info: any) {
    console.log("obrim");

    this.ENVIAR = info.event.extendedProps?.idReserva;
    console.log("montolivete " ,this.ENVIAR);
    this.showPopup = true;
  }

  closePopup() {
    console.log("tanquem");
    this.showPopup = false;
  }

  cerrarSesion() {
    this.logService.cerrarSesion();
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  cargarReservas() {
    console.log("aki");

    this.resService.getAllReservas().subscribe((data: any) => {
      console.log("aki");
      this.arrReservas = new ReservasMap().get(data);

      console.log("bona senyal");

      for (let index = 0; index < this.arrReservas.length; index++) {
        var newobjEvento: objEvento = { idReserva: 0, title: "", start: "" }

        newobjEvento.idReserva = this.arrReservas[index].idReserva;
        newobjEvento.title = "Cita tatuaje$$$", 
        newobjEvento.start = String(this.arrReservas[index].fechaReserva);
        // newobjEvento.start = "2025-04-25";
        this.arrEvents.push(newobjEvento);
      }
    //  console.log(this.arrEvents);

      this.calendarOptions.events = this.arrEvents;
    });
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventClick: this.handleEventClick.bind(this)
  };

}