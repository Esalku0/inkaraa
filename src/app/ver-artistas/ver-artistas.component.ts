import { Component, inject } from '@angular/core';
import { ArtistasService } from '../service/artistas.service';
import { Artista, ArtistasMap } from '../POJOs/artistas';
import { LoginService } from '../service/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarrouselImagenesComponent } from '../carrousel-imagenes/carrousel-imagenes.component';

@Component({
  selector: 'app-ver-artistas',
  imports: [CommonModule,
    FormsModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    CarrouselImagenesComponent],
  templateUrl: './ver-artistas.component.html',
  styleUrls: ['./ver-artistas.component.css'],
})

export class VerArtistasComponent {
  arrArtistas: Artista[] = [];

  rol: string = '';

  logService: LoginService = inject(LoginService);
  artiService: ArtistasService = inject(ArtistasService);

  tokenNull = false;
  constructor() {
    this.getArtistas();
    this.rol = this.logService.getRol();
    console.log(this.rol);

    if (localStorage.getItem("token") == null || localStorage.getItem("token") == "") {
      this.tokenNull = false;
    } else {
      this.tokenNull = true;
    }
  }

  cerrarSesion() {
    this.logService.cerrarSesion();
    location.reload();
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }


  getArtistas() {
    this.artiService.getAllArtistas().subscribe((data: any) => {
      this.arrArtistas = new ArtistasMap().get(data);

      for (let artista of this.arrArtistas) {
        artista.foto = `http://localhost:3000${artista.foto}`;
        console.log("FOTO:", artista.foto);
      }
    });
  }

  trackById(index: number, item: Artista): number {
    return item.idArtista;
  }
}
