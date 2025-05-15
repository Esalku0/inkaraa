-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para probeta
CREATE DATABASE IF NOT EXISTS `probeta` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `probeta`;

-- Volcando estructura para tabla probeta.artistas
CREATE TABLE IF NOT EXISTS `artistas` (
  `idArtista` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `alias` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `foto` varchar(255) NOT NULL,
  PRIMARY KEY (`idArtista`),
  KEY `fk_artistas_usuarios` (`idUsuario`),
  CONSTRAINT `fk_artistas_usuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla probeta.artistas: ~7 rows (aproximadamente)
INSERT INTO `artistas` (`idArtista`, `idUsuario`, `nombre`, `apellido`, `alias`, `ciudad`, `foto`) VALUES
	(32, 43, 'Jose Ignacio', 'De la cruz', 'El macarra', '2342', '/assets/artistas/1744276621086.jpg'),
	(33, 30, 'Jose Andres Dominguez', 'De la Fuente villanueva', 'El makina de la tintaxddddd', 'VALENCIA', '/assets/artistas/1742908769862.png'),
	(34, 33, '342', 'Martinez', 'Llopi03', '42323', '/assets/artistas/1742908866279.png'),
	(35, 35, '342', 'Martinez', 'Llopi03', '42323', '/assets/artistas/1742909012480.png'),
	(36, 36, '342', 'Martinez', 'Llopi03', '42323', '/assets/artistas/1742909168802.png'),
	(37, 37, '342', 'Martinez', 'Llopi03', '42323', '/assets/artistas/1742909231976.png'),
	(38, 38, '342', 'Martinez', 'Llopi03', '42323', '/assets/artistas/1742909276304.png');

-- Volcando estructura para tabla probeta.disenyos
CREATE TABLE IF NOT EXISTS `disenyos` (
  `idDisenyo` int(11) NOT NULL AUTO_INCREMENT,
  `imgDisenyo` varchar(45) DEFAULT NULL,
  `descrip` varchar(45) DEFAULT NULL,
  `idArtista` int(11) NOT NULL,
  `fechaCreacion` date DEFAULT NULL,
  PRIMARY KEY (`idDisenyo`),
  KEY `idArtista` (`idArtista`),
  CONSTRAINT `disenyos_ibfk_1` FOREIGN KEY (`idArtista`) REFERENCES `artistas` (`idArtista`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla probeta.disenyos: ~1 rows (aproximadamente)
INSERT INTO `disenyos` (`idDisenyo`, `imgDisenyo`, `descrip`, `idArtista`, `fechaCreacion`) VALUES
	(53, '/assets/disenyos/1744022774876.jpg', 'dfg', 32, '2025-03-25');

-- Volcando estructura para tabla probeta.disenyo_estilos
CREATE TABLE IF NOT EXISTS `disenyo_estilos` (
  `idDisenyo` int(11) NOT NULL,
  `idEstilo` int(11) NOT NULL,
  PRIMARY KEY (`idDisenyo`,`idEstilo`),
  KEY `disenyo_estilos_ibfk_2` (`idEstilo`),
  CONSTRAINT `disenyo_estilos_ibfk_1` FOREIGN KEY (`idDisenyo`) REFERENCES `disenyos` (`idDisenyo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `disenyo_estilos_ibfk_2` FOREIGN KEY (`idEstilo`) REFERENCES `estilos` (`idEstilo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla probeta.disenyo_estilos: ~1 rows (aproximadamente)
INSERT INTO `disenyo_estilos` (`idDisenyo`, `idEstilo`) VALUES
	(53, 1);

-- Volcando estructura para tabla probeta.estadoreserva
CREATE TABLE IF NOT EXISTS `estadoreserva` (
  `idEstado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descrip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idEstado`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla probeta.estadoreserva: ~3 rows (aproximadamente)
INSERT INTO `estadoreserva` (`idEstado`, `nombre`, `descrip`) VALUES
	(1, 'Pendiente', 'Reserva no confirmada'),
	(2, 'Confirmada', 'Reserva confirmada'),
	(3, 'Cancelada', 'Reserva cancelada');

-- Volcando estructura para tabla probeta.estilos
CREATE TABLE IF NOT EXISTS `estilos` (
  `idEstilo` int(11) NOT NULL AUTO_INCREMENT,
  `nombreEstilo` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstilo`),
  UNIQUE KEY `nombreEstilo` (`nombreEstilo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla probeta.estilos: ~4 rows (aproximadamente)
INSERT INTO `estilos` (`idEstilo`, `nombreEstilo`) VALUES
	(2, 'Cubismo'),
	(3, 'Expresionismo'),
	(8, 'ilowa'),
	(1, 'Surrealismo');

-- Volcando estructura para tabla probeta.reservas
CREATE TABLE IF NOT EXISTS `reservas` (
  `idReserva` int(11) NOT NULL AUTO_INCREMENT,
  `idArtista` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `fechaReserva` datetime NOT NULL,
  `detalles` varchar(255) DEFAULT NULL,
  `boceto` varchar(255) DEFAULT NULL,
  `idEstado` int(11) NOT NULL,
  PRIMARY KEY (`idReserva`),
  KEY `reservas_ibfk_1` (`idArtista`),
  KEY `reservas_ibfk_2` (`idCliente`),
  KEY `reservas_ibfk_3` (`idEstado`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`idArtista`) REFERENCES `artistas` (`idArtista`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`idEstado`) REFERENCES `estadoreserva` (`idEstado`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla probeta.reservas: ~12 rows (aproximadamente)
INSERT INTO `reservas` (`idReserva`, `idArtista`, `idCliente`, `fechaReserva`, `detalles`, `boceto`, `idEstado`) VALUES
	(6, 33, 43, '2025-05-01 00:00:00', 'mu wapo porfa', '/assets/bocetos/1744880748656.jpg', 1),
	(7, 33, 43, '2025-04-23 00:00:00', 'El tren infinito', '/assets/bocetos/1745310038628.jpg', 1),
	(8, 32, 43, '2025-04-23 00:00:00', 'a', '/assets/bocetos/1745310243199.jpg', 3),
	(9, 37, 43, '2025-05-01 00:00:00', 'ff', '/assets/bocetos/1745310311068.png', 1),
	(10, 37, 43, '2025-05-01 00:00:00', 'ff', '/assets/bocetos/1745310480556.png', 1),
	(11, 37, 43, '2025-05-01 00:00:00', 'ff', '/assets/bocetos/1745310543301.png', 3),
	(12, 37, 43, '2025-05-07 00:00:00', 'jh', '/assets/bocetos/1745310568802.png', 1),
	(13, 36, 43, '2025-04-23 00:00:00', 'el llopi porfa', '/assets/bocetos/1745310930029.jpg', 3),
	(14, 32, 43, '2025-04-30 00:00:00', '4', '/assets/bocetos/1745498338708.jpg', 1),
	(15, 32, 43, '2025-04-03 00:00:00', 'HOOOOOOOOOLA', '/assets/bocetos/1745498394859.jpg', 2),
	(16, 32, 43, '2025-04-24 00:00:00', 'ADIOOOS', '/assets/bocetos/1745498424647.jpg', 1),
	(17, 32, 43, '2025-04-26 00:00:00', 'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', '/assets/bocetos/1745498447319.jpg', 1);

-- Volcando estructura para tabla probeta.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `idRol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descrip` varchar(255) NOT NULL,
  PRIMARY KEY (`idRol`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla probeta.roles: ~3 rows (aproximadamente)
INSERT INTO `roles` (`idRol`, `nombre`, `descrip`) VALUES
	(1, 'Cliente', 'Usuario que solicita servicios'),
	(2, 'Administrador', 'Usuario con privilegios elevados'),
	(3, 'Artista', 'ARTISTA');

-- Volcando estructura para tabla probeta.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `usuarios_ibfk_1` (`rol`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla probeta.usuarios: ~25 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `contrasena`, `rol`) VALUES
	(2, 'Ana', 'López Martínez', 'estanis@gmail.com', '1234', 2),
	(4, 'Juan', 'Martinez', '42323@gmail.com', '23423423', 3),
	(5, 'dsfsd', 'sfdf', 'sdfdsfs@gmail.com', '24324234', 3),
	(7, 'dsfsd', 'sfdf', '435353@gmail.com', '24324234', 3),
	(8, 'dsfsd', '35443', '3534535@gmail.com', '24324234', 3),
	(9, '34', '34', '234@gmail.com', '24324234', 3),
	(13, '34', '34', '234234@gmail.com', '24324234', 3),
	(14, 'Sancho', 'Martinez', 'danielsancho@gmail.com', 'U2FsdGVkX18S+9HKB1UnbOUGjMYSrscCo4q4S88215U=', 1),
	(15, 'f', 'f', 'f@gmail.com', 'U2FsdGVkX1+j0UbGFW9JnGCsQBhtzj21VV7IbBGT91Q=', 1),
	(16, 'a', 'a', 'a@gmail.com', '$2b$10$pgSi.7sImWlt6KlgNQJcHehgcoQLb3Rbn0y0VKCjD8CqA4wAMnw3.', 1),
	(19, 'b', 'b', 'b@gmail.com', '$2b$10$.IuJKKyjMRf841Oz1im.i.Ltf08V7pxpEzlHSTMdyYFHt50jSa41u', 1),
	(21, 'c', 'c', 'c@gmail.com', '$2b$10$BdxMnt7sYbdWUF/xljXbOuRRse7h8j4HBG0OFSaj6/NlGa1j91Htm', 1),
	(22, 'd', 'd', 'd@gmail.com', '$2b$10$8LK.RXMqARX68tr.PUdKrO14.wuI1scjEISXugGN3yPQvf5YVfPZG', 1),
	(24, 'e', 'e', 'e@gmail.com', '$2b$10$NSuluE0IW2nDg9.R2tePueBktLoyy2twzkciEfhIE68ZAqWxLBfma', 1),
	(27, 'g', 'g', 'g@gmail.com', '$2b$10$Xp.jPsDqpTFIDi0XBmzBTets3ZVmOJow0QhWEFa4dxHz3PCjUlh0u', 1),
	(28, 'h', 'h', 'h@gmail.com', '$2b$10$E8nCGUAndzY9DmdoEV6SNu/vcbfAqgEUp9rL7iSWdyzMM7/EGRlmq', 1),
	(29, 'j', 'j', 'j@gmail.com', '$2b$10$7/2e7u989FVdOthjYOC0Gujmslk4cnviXF959sbip6HlaBTtKiQiG', 2),
	(30, 'Jose Andres Dominguez', 'De la Fuente villanueva', 'josemiguel@gmail.com', '1234', 3),
	(33, '342', 'Martinez', 'josemartinez@gmail.com', '24342', 3),
	(35, '342', 'Martinez', '43223423423423sdf@gmail.com', '24342', 3),
	(36, '342', 'Martinez', '3453453@gmail.com', '24342', 3),
	(37, '342', 'Martinez', '444444444@gmail.com', '24342', 3),
	(38, '342', 'Martinez', '44465444444@gmail.com', '24342', 3),
	(43, 'arti2', 'arti2', 'arti2@gmail.com', '$2b$10$frDSmUqwhaDw5fO57GHrMuv.7L06Ng9YjR2qcDuauMZHIMV28R6Re', 2),
	(44, 'usu', 'usu', 'usuario@gmail.com', '$2b$10$Z5.XOlxXNmAGQ2K3NCo6m.0z5/koUMsDbMS5R1WzlcqxBGRSY705q', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
