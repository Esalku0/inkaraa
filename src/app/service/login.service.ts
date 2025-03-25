import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  API: string = 'http://localhost:3000/login';

  login(usuario: string, pass: string) {
    console.log(usuario);
    console.log(pass);
    return this.http.post(this.API, { usuario: usuario, pass: pass });
  }

  //metodo al que posteriormente, llamaremos para asignar el token y el rol
  setSessionStorage(token: string, rol: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
  }

  //para tener en cuenta localsotrage es la memoria qure se guarda en el navegador
  //con esto, guardamos la sesion, importante poner los mismos nombres, si no, no lo haremos bien y no se guardara
  //por otra parte, tambien podemos hacer un get para devolver los datos que queremos 
  getRol():string {
    return localStorage.getItem('rol')||'';
  }
  cerrarSesion() {
    localStorage.clear();
  }

}
