import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EstilosService {
  constructor(private httpClient: HttpClient) {}
  private API = 'http://localhost:3000/estilos';

  getAllEstilos() {
    console.log(this.httpClient.get(this.API));
    return this.httpClient.get(this.API);
  }

  getAllEstilosById(id: number) {
    return this.httpClient.get(this.API + '/' + id);
  }
  
}
