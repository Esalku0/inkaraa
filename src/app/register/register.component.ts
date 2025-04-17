import { Usuario, UsuariosMap } from '../POJOs/usuarios';
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
  arrUsers: Usuario[] = [];

  confirmPassword: string = '';
  userService: UsuariosService = inject(UsuariosService);
  router: Router = inject(Router);
  popup: ToastrService = inject(ToastrService);

  constructor() { }


  comprobarEmailExistente() {
    this.userService.getAllUsuarios().subscribe((data: any) => {
      this.arrUsers = new UsuariosMap().get(data);

      for (let index = 0; index < this.arrUsers.length; index++) {
        if (this.arrUsers[index].email == this.newUser.email) {
          this.showErrorEmail();
        }
      }
    });
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
      this.popup.error('Por favor, introduce una contrasenya válida.', 'Error');

      this.newUser.contrasena = ""; // Opcional: Limpia el campo si es inválido
    }
  }

  encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(10); // Genera un salt (complejidad 10)
    return bcrypt.hashSync(password, salt); // Encripta la contraseña
  }

  enviar(): void {
    if (!this.newUser || this.newUser.contrasena !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log("entramos aqui ");
    this.userService.getAllUsuarios().subscribe((data: any) => {
      this.arrUsers = new UsuariosMap().get(data);

      for (let index = 0; index < this.arrUsers.length; index++) {
        console.log("tenemos: " + this.arrUsers[index].email)
        console.log("buscamos " + this.newUser.email)
        if (this.arrUsers[index].email == this.newUser.email) {
          this.showErrorEmail();
          return;
        }
      }

      this.userService.addUsuario(this.newUser).subscribe(() => {
        this.showSuccess();
        this.router.navigate(['/login']);
      });
    });
  }



  showSuccess() {
    this.popup.success('Proceso realizado correctamente!', '¡Perfecto!');
  }

  showErrorEmail() {
    this.popup.error('¡El Email ya existe en la Base de Datos!', '¡Lastima!');
  }
}
