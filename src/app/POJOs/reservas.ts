export interface Reserva {
  idReserva: number;
  idArtista: number;
  idCliente: number;
  fechaReserva: Date;
  detalles: string;
  boceto: string;
  idEstado: number;
}
