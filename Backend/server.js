const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
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
//LOGIN EALIAGA
app.post("/login", (req, res) => {
  console.log("Intento de login con:", req.body);

  const { usuario, pass } = req.body;

  db.query(
    "SELECT id, rol, contrasena FROM usuarios WHERE email = ?",
    [usuario],
    async (err, result) => {
      if (err) {
        console.error("Error en la base de datos:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      if (!result || result.length === 0) {
        console.warn("Usuario no encontrado");
        return res
          .status(401)
          .json({ error: "Usuario o contraseña incorrectos" });
      }

      const user = result[0];

      console.log("Contraseña ingresada:", pass);
      console.log("Contraseña en BD:", user.contrasena);

      try {
        // 🔥 Aquí se compara la contraseña en texto plano con la encriptada en la BD
        const isMatch = await bcrypt.compare(pass, user.contrasena);

        if (!isMatch) {
          console.warn("Contraseña incorrecta");
          return res
            .status(401)
            .json({ error: "Usuario o contraseña incorrectos" });
        }

        // Si la contraseña es correcta, generamos el token JWT
        const token = jwt.sign({ id: user.id, rol: user.rol }, "mostopapi", {
          expiresIn: "1h",
        });

        console.log("Token generado:", token);
        res.json({ token, rol: user.rol, id: user.id });
      } catch (error) {
        console.error("Error al comparar contraseñas:", error);
        return res.status(500).json({ error: "Error en el servidor" });
      }
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
  const query = "SELECT * FROM artistas WHERE idArtista = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error en la base de datos");
    } else {
      console.log("Datos obtenidos de la base de datos:", results);
      res.json(results);
    }
  });
});

app.get("/artistas/user/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  const query = "SELECT * FROM artistas WHERE idUsuario = ?";
  console.log("aca lide");
  db.query(query, [idUsuario], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error en la base de datos");
    } else {
      console.log("Datos obtenidos de la base de datos:", results);
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
  console.log("ESTILO: " + idEstilo);
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
        console.log("todo bien");
      }
    }
  });
});

app.get("/disenyos/artistas/:idArtista", (req, res) => {
  console.log("ENTREM EN ARTISTAS IDARTISTA");
  const { idArtista } = req.params;
  const query = "SELECT * from disenyos where idArtista = ?";
  db.query(query, [idArtista], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error en la base de datos");
    } else {
      // Verificamos si hay resultados
      if (results.length === 0) {
        res.status(404).send("No se encontraron diseños para este artista.");
      } else {
        // Si hay resultados, los enviamos como respuesta
        res.json(results);
        console.log("todo bien");
      }
    }
  });
});

app.post("/DisenyoEstilo", (req, res) => {
  const query = "INSER INTO disenyo_estilos (idDisenyo,idEstilo) = (?,?)";
  const { idDisenyo, idEstilo } = req.params;
  db.query(query, [idDisenyo, idEstilo], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      return res.status(500).send("Error en el servidor");
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

app.get("/usuarios", async (req, res) => {
  db.query("SELECT * FROM usuarios where rol NOT LIKE 2", (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      return res.status(500).send("Error en el servidor");
    } else {
      res.json(results);
    }
  });
});

app.get("/usuarios/id/:id", async (req, res) => {
  let { id } = req.params;
  db.query("SELECT * FROM usuarios where id = ?", id, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      return res.status(500).send("Error en el servidor");
    } else {
      res.json(results);
    }
  });
});

app.delete("/usuarios/:id", async (req, res) => {
  db.query("DELETE FROM usuarios where id= ? ", [req.params.id], (err) => {
    if (err) return res.status(500).send(err); // Manejo de errores al eliminar.
    res.sendStatus(200);
  });
});

app.post("/usuarios", async (req, res) => {
  const { nombre, apellidos, email, contrasena } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10); // 🔥 Aquí se encripta
    console.log("cossetes 1 " + contrasena);
    console.log("cossetes 2 " + hashedPassword);
    const query =
      "INSERT INTO usuarios (nombre, apellidos, email, contrasena, rol) VALUES (?, ?, ?, ?, 1)";

    db.query(
      query,
      [nombre, apellidos, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error en la base de datos:", err);
          return res.status(500).send("Error en el servidor");
        }

        res.status(200).json({ message: "Usuario registrado correctamente" });
      }
    );
  } catch (error) {
    console.error("Error encriptando la contraseña:", error);
    res.status(500).send("Error en el servidor");
  }
});
//OJITO CHAVALIN, USAMOS EL MIDDLEWARE DE MULTER PARA PODER GUARDAR UNA IMAGEN DONDE QUERAMOS.
//IMPORTANTE EALIAGA
//esto nos permite asignar de donde visualizar las imagenes, en este caso, la carpeta assets
app.use("/assets", express.static(path.join(__dirname, "../assets")));



//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//                                              SUBIR DISEÑO A LA BBDD
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------

//ealiaga OJITO, TIENE QUE AÑADIR 2 SI AÑADIMOS 2, REVISALO JEFE!!!

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ruta para subir datos y una imagen
    cb(null, "../assets/disenyos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generar un nombre único para evitar conflictos
  },
});

const upload = multer({ storage });

app.post("/disenyos", upload.single("image"), async (req, res) => {
  console.log("1", upload.single("image"));

  if (!req.file || !req.body.disenyo) {
    return res.status(400).send("Faltan datos en la solicitud");
  }
  try {
    const disenyo = JSON.parse(req.body.disenyo);
    const estilos = JSON.parse(req.body.estilos);
    const { imgDisenyo, descrip, idArtista, fechaCreacion } = disenyo;
    const { estilo1, estilo2 } = estilos;

    console.log(idArtista);
    const foto = `/assets/disenyos/${req.file.filename}`;
    const idArtistaTemp = 0;
    const queryTemp = "SELECT idArtista from artistas where idUsuario=(?)";
    const query1 = `INSERT INTO disenyos (imgDisenyo, descrip, idArtista, fechaCreacion) VALUES (?, ?, ?, ?)`;
    const query2 = `INSERT INTO disenyo_estilos (idDisenyo, idEstilo) VALUES (?, ?)`;

    db.query(queryTemp, [idArtista], (err, resultTemp) => {
      console.log(queryTemp, [idArtista]);
      if (err || resultTemp.length === 0) {
        console.error("Error al obtener idArtista:", err);
        return res.status(400).send("Error al obtener idArtista");
      }

      const idArtistaTemp = resultTemp[0].idArtista;

      console.log("aqui1");
      db.query(
        query1,
        [foto, descrip, idArtistaTemp, fechaCreacion],
        (err, result) => {
          if (err) {
            console.error("Error al insertar disenyo:", err);
            return res.status(500).send("Error al crear disenyo");
          }

          const lastId = result.insertId;
          console.log("AAAA" + estilos.length);

          if (estilos.length == 1) {
            db.query(query2, [lastId, estilos[0]], (err, result) => {
              if (err) {
                console.error("Error al insertar estilo:", err);
                return res.status(500).send("Error en la base de datos");
              }
            });
          } else if (estilos.length == 2) {
            console.log("entramos en el 1 xe");

            db.query(query2, [lastId, estilos[0]], (err, result) => {
              if (err) {
                console.error("Error al insertar estilos:", err);
                return res.status(500).send("Error en la base de datos");
              } else {
                db.query(query2, [lastId, estilos[1]], (err, result) => {
                  console.log("entramos en el 2 xe");
                });
              }
            });
          } else {
            return res.status(400).send("Debes seleccionar uno o dos estilos.");
          }

          console.log("disenyo creado con ID:", lastId);
        }
      );
    });
  } catch (error) {
    console.error("Error al procesar los datos:", error);
    res.status(400).send("Error al procesar la información enviada");
  }
});

//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//                                              AÑADIR ARTISTAS  A LA BBDD
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ruta para subir datos y una imagen
    cb(null, "../assets/artistas");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generar un nombre único para evitar conflictos
  },
});
const upload2 = multer({ storage: storage2 });

//Chequeamos que estamos haciendo un post de artistas, es decir, que estamos subiendo un artista, pero vamos a ejecutar
//varias cositas, primero vamos a subir la imagen, luego vamos a subir los datos del artista
app.post("/artistas", upload2.single("image"), async (req, res) => {
  console.log("2", upload2.single("image"));
  console.log("Contenido de req.body:", req.body);
  console.log("Archivo recibido en req.file:", req.file);

  //COMPROBAMOS SI FALTAN DATOS DEL BODY
  if (!req.file || !req.body.artista) {
    return res.status(400).send("Faltan datos en la solicitud");
  }

  try {
    //Pillamos el artista
    const artista = JSON.parse(req.body.artista);
    //sacamos los datos del artista!!
    const { nombre, apellido, alias, ciudad } = artista;
    const foto = `/assets/artistas/${req.file.filename}`;
    const tempPass = req.body.tempPass;
    const email = req.body.email;
    console.log("Datos del artista:", artista);
    console.log("password del artista:", tempPass);

    // 1. Insertar usuario
    const hashedPassword = await bcrypt.hash(tempPass, 10); // 🔥 Aquí se encripta
    console.log("password del artista encriptada:", hashedPassword);

    const query1 = `INSERT INTO usuarios (nombre, apellidos, email, contrasena, rol) VALUES (?, ?, ?, ?, 3)`;
    db.query(
      query1,
      [nombre, apellido, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error al insertar usuario:", err);
          return res.status(500).send("Error al crear usuario");
        }

        const lastId = result.insertId; // ID del usuario recién insertado
        console.log("Usuario creado con ID:", lastId);

        // 2. Insertar artista vinculado al usuario
        const query2 = `INSERT INTO artistas (idUsuario, nombre, apellido, alias, ciudad, foto) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(
          query2,
          [lastId, nombre, apellido, alias, ciudad, foto],
          (err, result) => {
            if (err) {
              console.error("Error al insertar artista:", err);
              return res.status(500).send("Error al crear artista");
            }

            console.log("Artista insertado con éxito:", result);
            res.status(200).json({ message: "Artista añadido con éxito" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error al procesar los datos:", error);
    res.status(400).send("Error al procesar la información enviada");
  }
});

//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//                                              AÑADIR RESERVAS EN LA BBDD
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------

app.get("/reservas", (req, res) => {
  db.query("SELECT * FROM reservas", (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      return res.status(500).send("Error en el servidor");
    }
    res.json(results);
  });
});

app.get("/reservasActivas", (req, res) => {
  db.query("SELECT * FROM reservas where idEstado<>3", (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      return res.status(500).send("Error en el servidor");
    }
    res.json(results);
  });
});

app.get("/reservas/id/:idReserva", (req, res) => {
  console.log("ENTREM EN idReserva");
  const { idReserva } = req.params;
  const query = "SELECT * from reservas where idReserva = ?";
  db.query(query, [idReserva], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error en la base de datos");
    } else {
      // Verificamos si hay resultados
      if (results.length === 0) {
        res.status(404).send("..No va..");
      } else {
        // Si hay resultados, los enviamos como respuesta
        res.json(results);
        console.log("todo bien");
      }
    }
  });
});

app.put("/reservas/estado/:idReserva", (req, res) => {
  console.log("update");

  var sql = "UPDATE reservas SET idEstado = ? WHERE idReserva = ?"; 
  var body = [req.body.idEstado, req.params.idReserva]; 

  db.query(sql, body, (err, result) => {
    if (err) {
      console.error("❌ Error al actualizar reserva:", err);
      return res.status(500).json({ message: "Error al actualizar la reserva", error: err }); 
    }
    console.log("aaa");
    res.status(200).json({ message: "Reserva actualizada exitosamente", result: result }); 
  });
});


//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//                                              AÑADIR RESERVAS IMAGEN
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------


const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ruta para subir datos y una imagen
    cb(null, "../assets/bocetos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload3 = multer({ storage: storage3 });

app.post("/reservas", upload3.single("image"), async (req, res) => {
  console.log("reservas");
  console.log(req.body.reservas);

  if (!req.file || !req.body.reservas) {
    return res.status(400).send("Faltan datos en la solicitud");
  }
  //Pillamos el artista
  const reserva = JSON.parse(req.body.reservas);
  //sacamos los datos del artista!!
  const {
    idReserva,
    idArtista,
    idCliente,
    fechaReserva,
    detalles,
    bocet,
    idEstado,
  } = reserva;

  const foto = `/assets/bocetos/${req.file.filename}`;

  const query =
    "INSERT INTO reservas (idReserva,idArtista,idCliente,fechaReserva,detalles,boceto,idEstado) VALUES (?,?,?,?,?,?,?)";

  db.query(
    query,
    [idReserva, idArtista, idCliente, fechaReserva, detalles, foto, idEstado],
    (err, result) => {
      if (err) {
        console.error("Error al insertar reserva:", err);
        return res.status(500).send("Error al crear reserva");
      } else {
        console.log("todo bien, salimos");
        res.json({ message: "Reserva creada correctamente" });
      }
    }
  );
});

//EALIAGA PERSONALIZADO
//mi middleware timidin, para verificar el token
//vasicamente vamos a comprobar si tiene token o no, si no tiene, devolvera error.
//se puede hacer tambien para comprobar roles y eso
function verificarToken(req, res, next) {}
app.use(verificarToken);
app.get("/", (req, res) => {
  res.send("¡Servidor corriendo! Bienvenido a la API.");
  next();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
