import * as CryptoJS from 'crypto-js';
import { Usuario } from '../POJOs/usuarios';
import { secretKey } from '../env/environment';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  newUser: Usuario = {
    idCliente: 0,
    nombre: '',
    apellidos: '',
    email: '',
    contrasenya: '',
  };
  confirmPassword: string = '';

  constructor() {}

  encryptPassword(password: string): string {
    const dev = CryptoJS.AES.encrypt(
      password,
      secretKey.secretKey
    ).toString();
    return dev;
  }

  onSubmit() {
    // Verificación de las contraseñas
    if (!this.newUser || this.newUser.contrasenya !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return false;
    }

    const encryptedPassword = this.encryptPassword(this.newUser.contrasenya);
    //Codigoenvio y eso

    return true;
  }
}
