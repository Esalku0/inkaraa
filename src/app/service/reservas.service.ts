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
  getAllReservasActivas() {
    return this.httpClient.get("http://localhost:3000/reservasActivas");
  }

  getAllReservasActivasPorIdArtista(idArtista:number) {
    return this.httpClient.get("http://localhost:3000/reservasActPorArtista/"+idArtista);
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

  putReservas(idReserva: number, idEstado: number) {
    console.log("aqui estamoooos");
    //  private API = 'http://localhost:3000/reservas';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { idReserva, idEstado }
    console.log(this.API + '/estado/' + idReserva, body, { headers: headers });
    return this.httpClient.put(this.API + '/estado/' + idReserva, body, { headers: headers });
  }


}