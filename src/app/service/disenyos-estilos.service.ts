import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisenyosEstilosService {

  private API = 'http://localhost:3000/DisenyoEstilo';
  constructor(private httpClient: HttpClient) {}

  getAllEstilos() {
    console.log(this.httpClient.get(this.API));
    return this.httpClient.get(this.API);
  }

  getAllArtistasById(id: number) {
    console.log('este es el id a buscar ' + id);
    return this.httpClient.get(this.API + '/' + id);
  }
}



