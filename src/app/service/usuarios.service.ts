import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../POJOs/usuarios';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private API = 'http://localhost:3000/usuarios';
  constructor(private httpClient: HttpClient) {}

  getAllUsuarios() {
    console.log(this.API);
    return this.httpClient.get(this.API);
  }

  getUsuariosById(id:number){
    console.log("GETAAAA", id);
    console.log(this.API + "/id/" + id);
    return this.httpClient.get(this.API + "/id/" + id);
  }

  addUsuario(newUser: Usuario){
    console.log(newUser.contrasena);
    return this.httpClient.post(this.API,newUser);
  }

  putUsuario(newUser: Usuario) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(this.API + '/' + newUser.id, newUser, { headers: headers });
  }

  delete(id: number) {
    console.log(this.API + '/' + id);
    return this.httpClient.delete(this.API + '/' + id,{responseType: 'text'} );
  }

}
