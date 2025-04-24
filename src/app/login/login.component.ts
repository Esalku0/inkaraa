import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CarrouselImagenesComponent } from '../carrousel-imagenes/carrousel-imagenes.component';
import { LoginService } from '../service/login.service';
import { secretKey } from '../env/environment';
import bcrypt from 'bcryptjs';
import { ToastrService } from 'ngx-toastr';

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
    popup: ToastrService = inject(ToastrService);
  
  constructor( ) {

  }

  login() {
    console.log(this.username);
    console.log(this.password);
    //var dev = this.encryptPassword(this.password);
    this.logService.login(this.username,this.password).subscribe({next:(data:any)=>{
      this.showSuccess();
      this.logService.setSessionStorage(data.token,data.rol,data.id);
      this.router.navigate(['/']); 
    },error:(error:any)=>{
      this.popup.error("No se ha encontrado ningun usuario con ese Email y Contraseña", '¡Lastima!');
    },
    }); 
 
  }
  
  showSuccess() {
    this.popup.success('Proceso realizado correctamente!', '¡Perfecto!');
  }

  showErrorEmail() {
    this.popup.error('¡El Email ya existe en la Base de Datos!', '¡Lastima!');
  }
  


}
