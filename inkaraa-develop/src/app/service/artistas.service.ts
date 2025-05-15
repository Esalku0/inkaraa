import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artista } from '../POJOs/artistas';
import { ruta } from '../../../Backend/ruta';
@Injectable({
  providedIn: 'root',
})



export class ArtistasService {
  private API= ruta + "/artistas"
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
    let privateAPI = 'http://192.168.1.23:8080/artistas/user';
    console.log(privateAPI +"/"+ idUsuario);
    return this.httpClient.get(privateAPI +"/"+ idUsuario);
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
