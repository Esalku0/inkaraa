import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { s } from '@angular/core/weak_ref.d-ttyj86RV';
import { DisenyoEstilos } from '../POJOs/disenyo-estilos';

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


  addDisenyosEstilos(newestilodis: DisenyoEstilos){
    console.log(this.API,newestilodis);
    return this.httpClient.post(this.API,newestilodis);
  }
}



