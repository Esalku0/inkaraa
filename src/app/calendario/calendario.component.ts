
import { Component, inject } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../service/login.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-calendario',
  imports: [FullCalendarModule,CommonModule,
    FormsModule, MatIconModule,
    RouterLink,
    RouterOutlet],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {
  selectedFile: File | "" = "";
  tempPass: string = "";
  email: string = "";

  //Datos para el token de sesión
  rol: string = '';
  logService: LoginService = inject(LoginService);

  router: Router = inject(Router);
  constructor(private http: HttpClient) {
    this.rol = this.logService.getRol();
    console.log(this.rol);
  }



  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [
      { title: 'Meeting', start: new Date() }
    ]
  };


  cerrarSesion() {
    this.logService.cerrarSesion();
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

}