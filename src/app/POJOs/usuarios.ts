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
