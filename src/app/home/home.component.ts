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
  tokenNull:boolean=true;
  logService: LoginService = inject(LoginService);


  constructor() {
    this.rol = this.logService.getRol();
    if (localStorage.getItem("token")==null || localStorage.getItem("token")=="") {
        this.tokenNull=false;
    }else{
      this.tokenNull=true;
    }
    console.log(localStorage.getItem("token"));

    console.log("esta vacio " + this.tokenNull);
  }

  cerrarSesion() {
    this.logService.cerrarSesion();
    location.reload();
    localStorage.removeItem('token'); 
    localStorage.removeItem('rol');  
  }

  comprobarRolUsuario() {
  }
}
