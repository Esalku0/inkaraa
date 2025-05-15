export interface Reserva {
  idReserva: number;
  idArtista: number;
  idCliente: number;
  fechaReserva: Date;
  detalles: string;
  boceto: string;
  idEstado: number;
}



export class ReservasMap {
  get(data: any) {
    if (!data) {
      console.error("Error: data no está definido", data);
      return [];
    }
    let loc = data.map((val: any) => {
      return {
        idReserva: val.idReserva,
        idArtista: val.idArtista,
        idCliente: val.idCliente,
        fechaReserva: val.fechaReserva,
        detalles: val.detalles,
        boceto: val.boceto,
        idEstado: val.idEstado,
      };
    });

    return loc;
  }
}
/*
[
  {
    "idReserva": 7,
    "idArtista": 33,
    "idCliente": 43,
    "fechaReserva": "2025-04-22T22:00:00.000Z",
    "detalles": "El tren infinito",
    "boceto": "/assets/bocetos/1745310038628.jpg",
    "idEstado": 1
  }
]
*/

export class ReservaSinMap {
  get(data: any): Reserva {

    let val;
    //comprobamos si es un array lo que nos llega.
    if (Array.isArray(data)) {
      //si es un array definimos que pillemos unicamente la posición 0, la primera
      val = data[0];
    } else {
      //si no, todo
      val = data;
    }

    if (!val) {
      console.error('Error: data no contiene una reserva válida', data);
    }

    return {
      idReserva: val.idReserva,
      idArtista: val.idArtista,
      idCliente: val.idCliente,
      fechaReserva: val.fechaReserva,
      detalles: val.detalles,
      boceto: val.boceto,
      idEstado: val.idEstado
    };
  }
}
