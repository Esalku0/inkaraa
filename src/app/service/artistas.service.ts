import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artista } from '../POJOs/artistas';
@Injectable({
  providedIn: 'root',
})
export class ArtistasService {
  private API = 'http://localhost:3000/artistas';
  constructor(private httpClient: HttpClient) {}

  getAllArtistas() {
    console.log(this.httpClient.get(this.API));
    return this.httpClient.get(this.API);
  }

  getAllArtistasById(id: number) {
    console.log('este es el id a buscar ' + id);
    console.log(this.API + '/' + id);
    return this.httpClient.get(this.API + '/' + id);
  }

  getAllArtistasByIdUsuario(idUsuario: number) {
    console.log('este es el id a buscar ' + idUsuario);
    let privateAPI = 'http://localhost:3000/artistas/user';

    console.log(privateAPI +"/"+ idUsuario);
    return this.httpClient.get(this.API + '/user/' + idUsuario);
  }

  getAllArtistasByEstilo(idEstilo: number) {
    console.log('este es el id a buscar ' + idEstilo);
    return this.httpClient.get(this.API + '/estilos/' + idEstilo);
  }
  
  addArtista(formData: FormData) {
    console.log(formData);

    return this.httpClient.post(this.API, formData);
  }
  
}
