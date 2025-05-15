import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CarrouselImagenesComponent } from '../carrousel-imagenes/carrousel-imagenes.component';
import { LoginService } from '../service/login.service';
import { Artista, ArtistaSinMap, ArtistasMap, ArtistasMap2 } from '../POJOs/artistas';
import { ArtistasService } from '../service/artistas.service';
import { DisenyosService } from '../service/disenyos.service';
import { Disenyo, DisenyosMap } from '../POJOs/disenyos';
@Component({
  selector: 'app-perfil-artistas',
  imports: [CommonModule,
    FormsModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    CarrouselImagenesComponent,],
  templateUrl: './perfil-artistas.component.html',
  styleUrl: './perfil-artistas.component.css'
})
export class PerfilArtistasComponent {


  artista: Artista = {
    idArtista: 0,
    nombre: '',
    apellido: '',
    alias: '',
    ciudad: '',
    foto: ''
  }
  
  disenyos: Disenyo[] = [];
  logService: LoginService = inject(LoginService);
  artiService: ArtistasService = inject(ArtistasService);
  disenyoService: DisenyosService = inject(DisenyosService);
  route: ActivatedRoute = inject(ActivatedRoute);
  rol = '';
  tokenNull = false;

  constructor() {
    const idParam: number = Number(this.route.snapshot.paramMap.get('id')) || 0;   

    this.rol = this.logService.getRol();
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == "") {
      this.tokenNull = false;
    } else {
      this.tokenNull = true;
    }

    this.cargarArtista(idParam);
    console.log(this.artista.nombre);
    console.log(this.artista.alias);

  }

  cargarArtista(id: number) {
    console.log("buscamos ete id " +  id );
    this.artiService.getAllArtistasById(id).subscribe((data: any) => {
      this.artista = new ArtistasMap2().get(data)[0];
      this.artista.foto = `http://192.168.1.23:8080${this.artista.foto}`;
      this.cargarDisenyos(id);
    });
  }

  cargarDisenyos(idartista: number) {
    this.disenyoService.getAllArtistasByIdArtista(idartista).subscribe((data: any) => {
      this.disenyos=new DisenyosMap().get(data);
      for (let index = 0; index < this.disenyos.length; index++) {
        this.disenyos[index].imgDisenyo = `http://192.168.1.23:8080${this.disenyos[index].imgDisenyo}`;
        
      }

    });
  }


  cerrarSesion() {
    console.log("a");
  }


}