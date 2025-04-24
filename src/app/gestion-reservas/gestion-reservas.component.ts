import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArtistasService } from '../service/artistas.service';
import { Artista, ArtistasMap } from '../POJOs/artistas';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../service/login.service';
import { UsuariosService } from '../service/usuarios.service';
import { Usuario, UsuariosMap } from '../POJOs/usuarios';

@Component({
  selector: 'app-pantalla-gestion-artista',
  imports: [CommonModule,
    FormsModule, MatIconModule,
    RouterLink,
    RouterOutlet],
  templateUrl: './gestion-reservas.component.html',
  styleUrl: './gestion-reservas.component.css',
})

export class GestionReservasComponent {
  artiService: ArtistasService = inject(ArtistasService);
  newArtista: Artista = { idArtista: 0, nombre: '', apellido: '', alias: '', ciudad: '', foto: '' };
  arratistas: Artista[] = [];
  usuService: UsuariosService = inject(UsuariosService);
  newUsu: Usuario = {
    id: 0,
    nombre: '',
    apellidos: '',
    email: '',
    contrasena: ''
  };
  arrUsu:Usuario[]=[];

  selectedFile: File | "" = "";
  tempPass: string = "";
  email: string = "";

  //Datos para el token de sesión
  rol: string = '';
  logService: LoginService = inject(LoginService);

  router: Router = inject(Router);
  constructor(private http: HttpClient) {
    this.rol = this.logService.getRol();
    console.log(this.rol);
    this.cargarTodosUsuario();
  }

  cerrarSesion() {
    this.logService.cerrarSesion();
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/home']);
  }

  //Ojito que esto es importante, basicament le hemos metido esta funcion a un change, para que que cuando se
  //seleccione un archivo se ejecute la funcio, esta funcion basicamente lo que hace es coger el archivo seleccionado
  //y lo guarda en la variable selectedFile
  onFileSelected(event: any): void {
    console.log("Evento detectado", event);
    console.log("pasa por aqui");
    this.selectedFile = event.target.files[0];
  }

  //Metodo para enviar y llamar al servicio de artistas, hay que tener en cuenta un par de cositas importantes.
  //No hemos gastado objeto aqui, ya que al pasarle una imagen y un objeto daba error,
  //si le pasabamos el objeto entero con la imagen daba error, por lo que hemos tenido que hacerlo de esta manera
  //con el FormData basicamente enviamos dos cosas, el obejto y la imagen, 
  //desde el backend se encarga de recogerlo y hacer lo que tenga que hacer
  enviar() {
    console.log("Preparando FormData...");

    if (!this.selectedFile) {
      console.error("No se seleccionó ninguna imagen.");
      return;
    }
    //preparamos el formData
    const formData = new FormData();
    //al formdata le metemos el objeto artista
    formData.append('artista', JSON.stringify(this.newArtista));
    //al formData le metemos la imagen
    formData.append('image', this.selectedFile);
    formData.append('email', this.email);
    formData.append('tempPass', this.tempPass);

    //nada, aqui todo normal, llamamos a nuestro querido observable donde le pasamos el formdata en vez de un obejto
    this.artiService.addArtista(formData).subscribe({
      next: (response: any) => {
        console.log("Artista añadido con éxito:", response);
        this.cargarTodosUsuario();
        this.vaciarUsuario();
      },
      error: (err: any) => {
        console.error("Error al añadir artista:", err);
      },
    });
  }

  cargarTodosUsuario(){
    console.log("entramos");
    this.usuService.getAllUsuarios().subscribe((data:any)=>{
      this.arrUsu= new UsuariosMap().get(data);
    });
  }
  borrarUsuario(id:number){
    this.usuService.delete(id).subscribe((data:any)=>{
      this.cargarTodosUsuario();
    })
  }

  vaciarUsuario(){
    this.newUsu = {
      id: 0,
      nombre: '',
      apellidos: '',
      email: '',
      contrasena: ''
    };
  }

}
