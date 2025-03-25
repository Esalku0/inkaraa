const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const path = require("path");

//GESTOR DE IMAGENES
const multer = require("multer");
const jwt = require("jsonwebtoken");

//MIDDLEWARE,OJITO EH
//UN MIDDLEWARE ES UNA FUNCION CON
//ACCESO A LOS REQ, RES Y NEXT
//CON ESTAS COSITAS, PODEMOS EJECUTAR NUESTRA LOGICA
//POR OTRA PARTE, EL MIDDLEWARE ES CODIGO QUE SE EJECUTARA ANTES DE LA LLAMADA
//A UNA RUTA PREDEFINIDA.
app.use(cors());
//Datos de laconexión
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "probeta",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
  } else {
    console.log("¡Conexión a la base de datos exitosa!");
  }
});

//MIDDLEWARE PARA VALIDAR EL TOKEN
//Metodo para logearse, importante este metodo ya que nos devuelve los tokens que queremos
//para guardar datos en el navegador y poder hacer controles de acceso por rol y demas
//IMPORTANTE EALIAGA
//EXPRESS.JSON ES UN MIDDLEWARE QUE NOS PERMITE RECIBIR DATOS EN FORMATO JSON
app.use(express.json()); 
//URLENCODED ES UN MIDDLEWARE QUE NOS PERMITE RECIBIR DATOS DE FORMA FACIL
//EN EL BODY DE UNA PETICION POST
//puedes procesar solicitudes con datos codificados en URL, como formularios.
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  console.log("Intento de login con:", req.body);
  
  const { usuario, pass } = req.body;
  // Consulta SQL corregida
  db.query(
    "SELECT id, rol FROM usuarios WHERE email = ? AND contrasena = ?",
    [usuario, pass],
    (err, result) => {
      if (err) {
        console.error("Error en la base de datos:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }

 
      if (!result || result.length === 0) {
        console.warn("Usuario o contraseña incorrectos");
        return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
      }
      //RESULT DE 0 SON LOS DATOS QUE NOS DEVUELVE LA CONSULTA SQL
      const user = result[0];
      //EL TOKEN ES UNA CADENA DE TEXTO QUE NOS PERMITE IDENTIFICAR A UN USUARIO
      //PARA ESO GASTAMOS JWT QUE ES UNA LIBRERIA QUE NOS PERMITE GENERAR TOKENS DE FORMA FACIL
      //PARA ELLO LE PASAMOS LOS DATOS QUE QUEREMOS GUARDAR EN EL TOKEN, EN NUESTRO CASO LE VAMOS
      //A APASAR EL USAURIO Y EL ROL, QUE SON LOS DATOS QUE QUEREMOS VISUALIZAR Y QUE LA CONSULTA NOS DEVUELVE
      //SI QUEREMOS AÑADIR MAS DATOS, TENDREMOS QUE CONFIGURAR LA CONSULTA SQL PARA QUE NOS DEVUELVA MAS DATOS 
      //DE ESTA FORMA, PODREMOS TENER EN EL RESULT UN ARRAY CON DICHOS DATOS
      //POR OTRA PARTE TAMBIEN LE PASAMOS UNA CLAVE, QUE ES LA QUE NOS VA A PERMITIR ENCRIPTAR Y DESENCRIPTAR NUESTRO TOKEN
      //LUEGO LE METEMOS UN TIMEOUT QUE SERA EL TIEMPO QUE VA A DURAR EL TOKEN EN NUESTRO LOCALSTORAGE
      const token = jwt.sign(
        { id: user.id, rol: user.rol },
        "mostopapi",
        { expiresIn: "1h" }
      );

      console.log("Token generado:", token);
      res.json({ token, rol: user.rol });
    }
  );
});

app.get("/artistas", (req, res) => {
  db.query("SELECT * FROM artistas", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error en el servidor");
    } else {
      console.log("Datos obtenidos de la base de datos:", results);
      res.json(results);
    }
  });
});

app.get("/artistas/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM artistas WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error en la base de datos");
    } else {
      res.json(results);
    }
  });
});

app.get("/disenyos", (req, res) => {
  db.query("SELECT * FROM disenyos", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(results);
    }
  });
});

app.get("/disenyos/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM disenyos WHERE idDisenyo = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error en la base de datos");
    } else {
      res.json(results);
    }
  });
});

app.get("/disenyos/estilos/:idEstilo", (req, res) => {
  const { idEstilo } = req.params;

  const query = `
      SELECT d.* 
      FROM disenyo_estilos de 
      INNER JOIN disenyos d ON d.idDisenyo = de.idDisenyo 
      WHERE de.idEstilo = ?`;

  db.query(query, [idEstilo], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error en la base de datos");
    } else {
      // Verificamos si hay resultados
      if (results.length === 0) {
        res.status(404).send("No se encontraron diseños para este estilo.");
      } else {
        // Si hay resultados, los enviamos como respuesta
        res.json(results); 
      }
    }
  });
});

app.get("/estilos", (req, res) => {
  db.query("SELECT * FROM estilos", (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      return res.status(500).send("Error en el servidor");
    }
    res.json(results);
  });
});

//OJITO CHAVALIN, USAMOS EL MIDDLEWARE DE MULTER PARA PODER GUARDAR UNA IMAGEN DONDE QUERAMOS.
//IMPORTANTE EALIAGA
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ruta para subir datos y una imagen
    cb(null, "../assets/artistas"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generar un nombre único para evitar conflictos
  },
});
const upload = multer({ storage });
//Chequeamos que estamos haciendo un post de artistas, es decir, que estamos subiendo un artista, pero vamos a ejecutar
//varias cositas, primero vamos a subir la imagen, luego vamos a subir los datos del artista
app.post("/artistas", upload.single("image"), (req, res) => {
  console.log("probeta");
  console.log("Contenido de req.body:", req.body);
  console.log("Archivo recibido en req.file:", req.file);

  if (!req.file || !req.body.artista) {
    console.error("Faltan datos: imagen o información del artista");
    return res.status(400).send("Faltan datos en la solicitud");
  }

  try {
    //asignamos el json del artista a una variable
    const artista = JSON.parse(req.body.artista); 
    console.log("Artista procesado:", artista);

    //JEFE, aqui estamos asignando a estas varaibles, los valors de artista, que hemos pillado del json
    //pq se hace asi? pues para ahorrarse el tener que hacer artista.nombre, artista.apellido, etc basicamente xd
    const { nombre, apellido, alias, ciudad } = artista;
    //importante pq esto va a ser la ruta de la imagen, que se va a guardar en la base de datos,
    //que sea la misma que hemos gastado en el middleware de multer si no, no hacmeos na
    const foto = `/assets/artistas/${req.file.filename}`; 

    const tempPass=req.body.tempPass;
    const email=req.body.email;

    console.log("tempPass ",tempPass);

    const query = `INSERT INTO artistas (nombre, apellido, alias, ciudad, foto) VALUES (?, ?, ?, ?, ?)`;
    const query2 = `INSERT INTO usuarios (nombre, apellidos, email, contrasena, rol) VALUES (?, ?, ?, ?, 3)`;

    db.query(query, [nombre, apellido, alias, ciudad, foto], (err, result) => {
      if (err) {
        console.error("Error al insertar en la base de datos:", err);
        return res.status(500).send("Error en el servidor");
      }
      console.log("Artista insertado con éxito:", result);
      //Si llegamos aqui es que funnciona perfectamente, no devolvemos nada
     // res.status(201).json({ mensaje: "Artista creado con éxito", id: result.insertId });
    });
    
    db.query(query2,[nombre,apellido,email,tempPass],(err, result )=>{
        if (err) {
          console.error("Error al insertar en la base de datos:", err);
          return res.status(500).send("Error en el servidor");
        }
        console.log("Usuario insertado con éxito:", result);
        res.status(201).json({mensaje:"Usuario crradro con exito",id:result.insertId});
    });

  } catch (error) {
    console.error("Error al procesar los datos:", error);
    res.status(400).send("Error al procesar la información enviada");
  }
});
//mi middleware timidin, para verificar el token
//vasicamente vamos a comprobar si tiene token o no, si no tiene, devolvera error.
//se puede hacer tambien para comprobar roles y eso
function verificarToken(req,res,next){

}
app.use(verificarToken);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
