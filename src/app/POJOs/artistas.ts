
export interface Artista {
  idArtista: number;
  nombre: string;
  apellido: string;
  alias: string;
  ciudad: string;
  foto: string | null;
}

export class ArtistasMap {
  get(data: any) {
    if (!data) {
      console.error('Error: data no está definido', data);
      return [];
    }

    let loc = data.map((val: any) => {
      console.log('Guarro');
      console.log(val);

      return {
        idArtista: val.idArtista,
        nombre: val.nombre,
        apellido: val.apellido,
        alias: val.alias,
        ciudad: val.ciudad,
        foto: val.foto
      };
    });

    return loc;
  }
}

export class ArtistaSinMap {
  get(data: any): Artista {

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
      idArtista: val.idArtista,
      nombre: val.nombre,
      apellido: val.apellido,
      alias: val.alias,
      ciudad: val.ciudad,
      foto: val.foto
    };
  }
}




/*
export class ArtistaSinMap {
  get(data: any): Artista {
    if (data && data.idArtista) {
      return {
        idArtista: data.idArtista,
        nombre: data.nombre,
        apellido: data.apellido,
        alias: data.alias,
        ciudad: data.ciudad,
        foto: data.foto
      };
    }

    console.error('Datos del artista no válidos:', data);
    return {} as Artista; // Retorna un objeto vacío del tipo Artista
  }
}
*/

export class ArtistasMap2 {
  get(data: any) {
    if (!data) {
      console.error('Error: data no está definido', data);
      return [];
    }

    let loc = data.map((val: any) => {
      console.log('Guarro');
      console.log(val);
      console.log(val.idArtista);
      console.log(val.nombre);

      return {
        idArtista: val.idArtista,
        nombre: val.nombre,
        apellido: val.apellido,
        alias: val.alias,
        ciudad: val.ciudad,
        foto: val.foto
      };
    });

    return loc;
  }
}

