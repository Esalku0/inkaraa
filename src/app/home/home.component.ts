import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarrouselImagenesComponent } from '../carrousel-imagenes/carrousel-imagenes.component';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    CarrouselImagenesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  probeta: string = 'https://www.lamanuelatattoo.com/';
  rol: string = '';

  logService: LoginService = inject(LoginService);


  constructor() {
    this.rol = this.logService.getRol();
    console.log(this.rol);
  }

  cerrarSesion() {
    this.logService.cerrarSesion();
    location.reload();
    localStorage.removeItem('token'); // 🔹 Borra el token
    localStorage.removeItem('rol');   // 🔹 Borra el rol
  }

  comprobarRolUsuario() {
    // Aquí va tu lógica personalizada.
  }
}
