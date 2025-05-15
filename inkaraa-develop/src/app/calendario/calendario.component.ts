
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
import { ToastrService } from 'ngx-toastr';
import { Artista, ArtistaSinMap, ArtistasMap } from '../POJOs/artistas';
import { ArtistasService } from '../service/artistas.service';


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
  newArtista: Artista = {
    idArtista: 0,
    nombre: '',
    apellido: '',
    alias: '',
    ciudad: '',
    foto: null
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
  popup: ToastrService = inject(ToastrService);
  artiService: ArtistasService = inject(ArtistasService)

  ENVIAR: number = 0;

  idArtisa: number = 0;

  constructor(private http: HttpClient) {
    this.rol = this.logService.getRol();

    var idUsuario = localStorage.getItem("id");
    console.log("se pierde ", idUsuario);


    this.cargarArtistaPorUsuario(Number(idUsuario));


    console.log(this.rol);
    console.log(this.newArtista.idArtista);
   // this.cargarReservas(this.newArtista.idArtista);
  }

  handleEventClick(info: any) {
    console.log("obrim");

    this.ENVIAR = info.event.extendedProps?.idReserva;
    console.log("montolivete ", this.ENVIAR);
    this.showPopup = true;
  }

  closePopup() {
    console.log("tanquem");
    this.showPopup = false;
  }

  rechazarReserva(idReserva: number) {
    this.showPopup = false;

    console.log("hemos llegado");

    const idEstado = 3;

    this.resService.putReservas(idReserva, idEstado).subscribe({
      next: (data: any) => {
        this.popup.error("Reserva rechaza...", "Rechazada.")
        console.log("cancelada");
        this.cargarReservas(this.newArtista.idArtista);

      }, error: (err: any) => {
        console.error(err);
      }
    });
  }

  aceptarReserva(idReserva: number) {
    this.showPopup = false;

    console.log("hemos llegado");

    const idEstado = 2;
    this.resService.putReservas(idReserva, idEstado).subscribe({
      next: (data: any) => {
        this.popup.success('Reserva Aceptada!', 'Aceptada!');

        console.log("aceptada");
        this.cargarReservas(this.newArtista.idArtista);

      }, error: (err: any) => {
        console.error(err);
      }
    });
  }

  cerrarSesion() {
    this.logService.cerrarSesion();
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  cargarReservas(idArtista: number) {
    console.log("aki");
    console.log("TOOOOMA ", idArtista)
    this.resService.getAllReservasActivasPorIdArtista(idArtista).subscribe((data: any) => {
      console.log("aki");
      this.arrReservas = new ReservasMap().get(data);

      console.log("bona senyal");

      for (let index = 0; index < this.arrReservas.length; index++) {
        var newobjEvento: objEvento = { idReserva: 0, title: "", start: "" }
        var texto:string="";
        if (this.arrReservas[index].idEstado==1) {
          texto="Pendiente";
        }else if(this.arrReservas[index].idEstado==2){
          texto="Confirmada";
        }else{
          texto="Rechazada";
        }
        newobjEvento.idReserva = this.arrReservas[index].idReserva;
        newobjEvento.title = texto,
          newobjEvento.start = String(this.arrReservas[index].fechaReserva);
        // newobjEvento.start = "2025-04-25";
        this.arrEvents.push(newobjEvento);
      }
      //  console.log(this.arrEvents);

      this.calendarOptions.events = this.arrEvents;
    });
  }

  cargarArtistaPorUsuario(idUsuario: number) {
    console.log("le llega A LO BUENO ", idUsuario)
    this.artiService.getAllArtistasByIdUsuario(idUsuario).subscribe({
      next: (data) => {
        this.newArtista = new ArtistaSinMap().get(data);
        console.log(this.newArtista);
        this.cargarReservas(this.newArtista.idArtista);

      }, error: (err) => {
        console.log(err);
      },
    });

  }




  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventClick: this.handleEventClick.bind(this)
  };

}