export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  contrasena: string;
}



export class UsuariosMap {
  get(data: any) {
    if (!data) {
      console.error('Error: data no está definido', data);
      return [];
    }
    
    let loc = data.map((val: any) => {

      return {
        id: val.id,  
        nombre: val.nombre,
        apellidos: val.apellidos,
        email: val.email,
        contrasena: val.contrasena
      };
    });
    
    return loc;
  }
}

export class UsuariosSinMap {
  get(data: any): Usuario {

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
      console.error('Error: data no contiene un usuario valido', data);
    }

    return {
      id: val.id,
      nombre: val.nombre,
      apellidos: val.apellidos,
      email: val.email,
      contrasena: val.contrasena
    };
  }
}
