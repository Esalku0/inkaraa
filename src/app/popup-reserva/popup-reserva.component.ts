import { Component, EventEmitter, inject, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { ReservasService } from '../service/reservas.service';
import { Reserva, ReservaSinMap } from '../POJOs/reservas';

@Component({
  selector: 'app-popup-reserva',
  templateUrl: './popup-reserva.component.html',
  styleUrls: ['./popup-reserva.component.css']
})
export class PopupReservaComponent implements OnChanges {

  @Input() idReserva: any;
  @Output() cerrarPopup = new EventEmitter<void>();

  newReserva: Reserva = {
    idReserva: 0,
    idArtista: 0,
    idCliente: 0,
    fechaReserva: new Date,
    detalles: "",
    boceto: "",
    idEstado: 0
  };

  constructor(){
  }

  resService: ReservasService = inject(ReservasService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idReserva'] && changes['idReserva'].currentValue) {
      console.log("Nuevo idReserva recibido:", changes['idReserva'].currentValue);
      this.getReservaById(String(changes['idReserva'].currentValue)); 
    }
  }

  close() {
    this.cerrarPopup.emit();
  }

  getReservaById(idReserva: string) {
    this.resService.getAllReservasById(idReserva).subscribe({
      next: (data: any) => {
        console.log("dentrodel output");
        this.newReserva = new ReservaSinMap().get(data);
        this.newReserva.boceto=`http://localhost:3000${this.newReserva.boceto}`;
        console.log("xd" , this.newReserva);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
