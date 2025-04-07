import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarrouselImagenesComponent } from '../carrousel-imagenes/carrousel-imagenes.component';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-perfil-artistas',
  imports: [    CommonModule,
    FormsModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    CarrouselImagenesComponent,],
  templateUrl: './perfil-artistas.component.html',
  styleUrl: './perfil-artistas.component.css'
})
export class PerfilArtistasComponent {
rol='1';
tokenNull=false;

constructor(){

}




cerrarSesion(){
  console.log("a");
}


}