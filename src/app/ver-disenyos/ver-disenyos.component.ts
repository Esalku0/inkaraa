import { Component, inject } from "@angular/core";
import { Disenyo, DisenyosMap } from "../POJOs/disenyos";
import { DisenyosService } from "../service/disenyos.service";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DisenyosEstilosService } from "../service/disenyos-estilos.service";
import { EstilosService } from "../service/estilos.service";
import { MatIconModule } from "@angular/material/icon";
import { Estilos, EstilosMap } from "../POJOs/estilos";
import { ArtistasService } from "../service/artistas.service";
import { LoginService } from "../service/login.service";
@Component({
  selector: "app-ver-disenyos",
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    RouterModule,
    RouterOutlet,
    MatIconModule,
  ],
  templateUrl: "./ver-disenyos.component.html",
  styleUrl: "./ver-disenyos.component.css",
})
export class VerDisenyosComponent {

  idClickFiltrado: number = 0;
  arrDisenyos: Disenyo[] = [];
  arrEstilos: Estilos[] = [];

  disenyoService: DisenyosService = inject(DisenyosService);
  disenyosEstilosService: DisenyosEstilosService = inject(DisenyosEstilosService);
  estilosService: EstilosService = inject(EstilosService);
  logService: LoginService = inject(LoginService);

  rol: string = '';
  tokenNull = false;

  constructor() {
    console.log("asdad");
    this.cargarDisenyos();
    this.cargarEstilos();
    this.rol = this.logService.getRol();
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == "") {
      this.tokenNull = false;
    } else {
      this.tokenNull = true;
    }

  }

  cargarDisenyos() {
    this.disenyoService.getAllDisenyos().subscribe((data: any) => {
      this.arrDisenyos = new DisenyosMap().get(data);

      for (let item of this.arrDisenyos) {
        item.imgDisenyo = `http://localhost:3000${item.imgDisenyo}`;
        console.log(item.imgDisenyo);
      }
    });
  }

  cargarEstilos() {
    this.estilosService.getAllEstilos().subscribe((data: any) => {
      this.arrEstilos = new EstilosMap().get(data);

    });
  }/*
  cargarDisenyosById(idEstilo:number){
    console.log("ID ESTILO",idEstilo); 
    this.disenyoService.getAllArtistasByEstilo(idEstilo).subscribe((data:any)=>{
    this.arrDisenyos= new DisenyosMap().get(data);
    });
  }
    */
  cargarDisenyosById(idEstilo: number) {
    console.log("ID ESTILO ENVIADO:", idEstilo);
    this.disenyoService.getAllDisenyosByEstilo(idEstilo).subscribe((data: any) => {
      console.log("Datos recibidos:", data);
      this.arrDisenyos = new DisenyosMap().get(data);
    },
      (error) => {
        if (error.status === 404) {
          console.warn("No hay diseños para este estilo, mostrando array vacío.");
          this.arrDisenyos = []; // Evita que Angular lo considere un error
        } else {
          console.error("Error al cargar diseños:", error);
        }
      }
    );
  }


  cambiarFiltro(idEstilo: number) {
    this.idClickFiltrado = idEstilo;
    console.log(idEstilo);
    this.cargarDisenyosById(idEstilo);
  }

  cerrarSesion() {
    this.logService.cerrarSesion();
    location.reload();
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }
}
