
export interface Artista {
  idArtista: number;
  nombre: string;
  apellido: string;
  alias: string;
  ciudad: string;
  foto:string | null;
}

/*
export class ArtistasMap {
  get(data: any) {

    if (!data || !data.artistas || !data.artistas.records) {
      console.error('Error: data.artistas.records no está definido', data);
      return [];
    }
    let loc = data['artistas'].records.map((val: any[]) => {
      return {
        idArtista: val[0],
        nombre: val[1],
        apellido: val[2],
        alias: val[3],
        ciudad: val[4],
      };
    });
    return loc;
  }
}
*/

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

