import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CarrouselImagenesComponent } from '../carrousel-imagenes/carrousel-imagenes.component';
import { LoginService } from '../service/login.service';
import { secretKey } from '../env/environment';
import bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  imports: [   
     CommonModule,
    FormsModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router:Router = inject(Router);
  username: string = '';
  password: string = '';
 
  logService: LoginService = inject(LoginService);
  constructor( ) {

  }

  login() {
    console.log(this.username);
    console.log(this.password);
    //var dev = this.encryptPassword(this.password);
    this.logService.login(this.username,this.password).subscribe((data:any)=>{
      //Pq justamente estos valores? Pq son los que hemos definido en el backend
      //literalmente es lo que nos devuelve el metodo de login
      //se lo pasamos directamente a la funcion de session storage
      this.logService.setSessionStorage(data.token,data.rol);
      this.router.navigate(['/']); 
    });
  }


}
