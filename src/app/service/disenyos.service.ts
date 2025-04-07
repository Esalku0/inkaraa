import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disenyo } from '../POJOs/disenyos';

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

  getAllArtistasByIdArtista(idArtista: number) {
    console.log(this.API + '/artistas/' + idArtista);
    return this.httpClient.get(this.API + '/artistas/' + idArtista);
  }

  getAllDisenyosByEstilo(idEstilo: number) {
    console.log('este es el id a buscar ' + idEstilo);
    return this.httpClient.get(this.API + '/estilos/' + idEstilo);
  }

postDisenyo(formData: FormData) {
    console.log("FormData antes de enviarse:");
    
    formData.forEach((value, key) => {
        console.log(`${key}:`, value);
    });

    return this.httpClient.post(this.API, formData);
}

  

}
