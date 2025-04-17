import { Usuario } from '../POJOs/usuarios';
import { secretKey } from '../env/environment';
import { Component, inject } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  newUser: Usuario = {
    id: 0,
    nombre: '',
    apellidos: '',
    email: '',
    contrasena: '',
  };
  confirmPassword: string = '';
  userService:UsuariosService = inject(UsuariosService);
  router:Router = inject(Router);
  popup:ToastrService=inject(ToastrService);

  constructor() {}


  comprobarEmailExistente(){
    
  }

  comprobarPatternEmail() {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.newUser.email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      this.newUser.email = ""; // Opcional: Limpia el campo si es inválido
    }
  }

  comprobarPatternPassword() {
    const passwPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;
    if (!passwPattern.test(this.newUser.contrasena)) {
      alert("Por favor, introduce una contrasenya válida.");
      this.newUser.contrasena = ""; // Opcional: Limpia el campo si es inválido
    }
  }

  encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(10); // Genera un salt (complejidad 10)
    return bcrypt.hashSync(password, salt); // Encripta la contraseña
  }
  
  enviar() {
    // Verificación de las contraseñas
    if (!this.newUser || this.newUser.contrasena !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return false;
    }
  //  this.newUser.contrasena = this.encryptPassword(this.newUser.contrasena);
  //  console.log(this.newUser.contrasena);
    this.userService.addUsuario(this.newUser).subscribe((data: any) => {

      this.router.navigate(['/login']);
    });
    return true;
  }


  showSuccess() {
    this.popup.success('¡Movimiento realizado correctamente!', '¡Perfecto!');
  }
}
