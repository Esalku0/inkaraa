export interface Estilos {
  idEstilo: number;
  nombreEstilo: string;
}

export class EstilosMap {
  get(data: any) {
    if (!data) {
      console.error("Error: data no está definido", data);
      return [];
    }
    let loc = data.map((val: any) => {
        console.log(val.idEstilo);
        console.log(val.nombreEstilo);

      return {
        idEstilo: val.idEstilo,
        nombreEstilo: val.nombreEstilo,
      };
    });

    return loc;
  }
}
