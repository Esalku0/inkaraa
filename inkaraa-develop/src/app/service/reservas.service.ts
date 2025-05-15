import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../POJOs/reservas';
import { ruta } from '../../../Backend/ruta.js';

@Injectable({
  providedIn: 'root'
})

export class ReservasService {
      private API= ruta + "/reservas"

 // API:string=ruta+"/reservas";


  constructor(private httpClient: HttpClient) { }

  getAllReservas() {
    return this.httpClient.get(this.API);
  }
  getAllReservasActivas() {
    return this.httpClient.get("http://192.168.1.23:8080/reservasActivas");
  }

  getAllReservasActivasPorIdArtista(idArtista:number) {
    return this.httpClient.get("http://192.168.1.23:8080/reservasActPorArtista/"+idArtista);
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

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { idReserva, idEstado }
    console.log(this.API + '/estado/' + idReserva, body, { headers: headers });
    return this.httpClient.put(this.API + '/estado/' + idReserva, body, { headers: headers });
  }


}