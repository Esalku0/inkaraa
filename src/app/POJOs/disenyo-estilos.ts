export interface DisenyoEstilos{
    idDisenyo:number;
    idEstilo:number;
}

export class DisenyoEstilosMap {
    get(data: any) {
      if (!data) {
        console.error('Error: data no está definido', data);
        return [];
      }
      
      let loc = data.map((val: any) => {
  
        return {
          idDisenyo: val.idDisenyo,  
          idEstilo: val.idEstilo
        };
      });
      
      return loc;
    }
  }
  