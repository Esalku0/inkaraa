import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DisenyosService {

  private API = 'http://localhost:3000/disenyos';
  constructor(private httpClient: HttpClient) {}

  getAllDisenyos() {
    console.log(this.httpClient.get(this.API));
    return this.httpClient.get(this.API);
  }

  getAllArtistasById(id: number) {
    console.log('este es el id a buscar ' + id);
    return this.httpClient.get(this.API + '/' + id);
  }

  getAllArtistasByEstilo(idEstilo: number) {
    console.log('este es el id a buscar ' + idEstilo);
    return this.httpClient.get(this.API + '/estilos/' + idEstilo);
  }


}
