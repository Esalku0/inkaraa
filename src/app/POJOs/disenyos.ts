export interface Disenyo {
  idDisenyo: number;
  imgDisenyo: string;
  descrip: string;
  idArtista: number;
  fechaCreacion: Date;
}

export class DisenyosMap {
  get(data: any) {
    if (!data) {
      console.error('Error: data no está definido', data);
      return [];
    }
    
    let loc = data.map((val: any) => {

      return {
        idDisenyo: val.idDisenyo,  
        imgDisenyo: val.imgDisenyo,
        descrip: val.descrip,
        idArtista: val.idArtista,
        fechaCreacion: val.fechaCreacion
      };
    });
    
    return loc;
  }
}
