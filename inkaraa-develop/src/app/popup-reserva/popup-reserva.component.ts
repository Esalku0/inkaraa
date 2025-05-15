import { Component, EventEmitter, inject, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { ReservasService } from '../service/reservas.service';
import { Reserva, ReservaSinMap } from '../POJOs/reservas';
import { Usuario, UsuariosSinMap } from '../POJOs/usuarios';
import { UsuariosService } from '../service/usuarios.service';
import { C } from '@fullcalendar/core/internal-common';
@Component({
  selector: 'app-popup-reserva',
  templateUrl: './popup-reserva.component.html',
  styleUrls: ['./popup-reserva.component.css']
})
export class PopupReservaComponent implements OnChanges {

  @Input() idReserva: any;
  @Output() cerrarPopup = new EventEmitter<void>();
  @Output() rechazarReserva = new EventEmitter<number>();
  @Output() aceptarReserva = new EventEmitter<number>();

  newReserva: Reserva = {
    idReserva: 0,
    idArtista: 0,
    idCliente: 0,
    fechaReserva: new Date,
    detalles: "",
    boceto: "",
    idEstado: 0
  };

  newUsuario: Usuario = {
    id: 0,
    nombre: '',
    apellidos: '',
    email: '',
    contrasena: ''
  };

  constructor() {
  }

  resService: ReservasService = inject(ReservasService);
  usuService: UsuariosService = inject(UsuariosService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idReserva'] && changes['idReserva'].currentValue) {
      console.log("Nuevo idReserva recibido:", changes['idReserva'].currentValue);
      this.getReservaById(String(changes['idReserva'].currentValue));
    }
  }

  close() {
    this.cerrarPopup.emit();
  }

  rechazar() {
    console.log("Componente hijo: Emitiendo rechazarReserva con idReserva =", this.idReserva);
    this.rechazarReserva.emit(this.idReserva); // 🔥 Asegura que se emite correctamente
  }
  
  aceptar() {
    console.log("Componente hijo: Emitiendo aceptarReserva con idReserva =", this.newReserva.idReserva);
    this.aceptarReserva.emit(this.newReserva.idReserva);
  }
  

  getReservaById(idReserva: string) {
    this.resService.getAllReservasById(idReserva).subscribe({
      next: (data: any) => {
        console.log("dentrodel output");
        this.newReserva = new ReservaSinMap().get(data);
        this.newReserva.boceto = `http://192.168.1.23:8080${this.newReserva.boceto}`;
        console.log("xd", this.newReserva);
        this.cargarUsuario();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  cargarUsuario() {
    var id = this.newReserva.idCliente;
    console.log("macmecmic " , id);
    this.usuService.getUsuariosById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.newUsuario = new UsuariosSinMap().get(data);
      }, error: (err: any) => {
        console.error(err);
      },
    });
  }

}
