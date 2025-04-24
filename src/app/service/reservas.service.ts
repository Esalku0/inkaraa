import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../POJOs/reservas';

@Injectable({
  providedIn: 'root'
})

export class ReservasService {

  private API = 'http://localhost:3000/reservas';
  constructor(private httpClient: HttpClient) { }

  getAllReservas() {
    return this.httpClient.get(this.API);
  }

  getAllReservasById(idReserva: string) {
    console.log("GET", idReserva);
    console.log(this.API + "/id/" + idReserva);
    return this.httpClient.get(this.API + "/id/" + idReserva);
  }

  postReservas(newReserva: FormData) {
    console.log(this.API, newReserva);
    return this.httpClient.post(this.API, newReserva);
  }




}