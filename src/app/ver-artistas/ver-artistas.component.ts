import { Component } from '@angular/core';
import { ArtistasService } from '../service/artistas.service';
import { Artista, ArtistasMap } from '../POJOs/artistas';

@Component({
  selector: 'app-ver-artistas',
  templateUrl: './ver-artistas.component.html',
  styleUrls: ['./ver-artistas.component.css'],
})
export class VerArtistasComponent {
  arrArtistas: Artista[] = [];

  constructor(private artiService: ArtistasService) {
    this.getArtistas();
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
