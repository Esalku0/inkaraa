-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-03-2025 a las 14:33:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `probeta`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artistas`
--

CREATE TABLE `artistas` (
  `idArtista` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `alias` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `artistas`
--

INSERT INTO `artistas` (`idArtista`, `idUsuario`, `nombre`, `apellido`, `alias`, `ciudad`, `foto`) VALUES
(32, 13, 'Jose Ignacio', 'De la cruz', 'El macarra', '2342', '/assets/artistas/1742895285597.jpg'),
(33, 30, 'Jose Andres Dominguez', 'De la Fuente villanueva', 'El makina de la tintaxddddd', 'VALENCIA', '/assets/artistas/1742908769862.png'),
(34, 33, '342', 'Martinez', 'Llopi03', '42323', '/assets/artistas/1742908866279.png'),
(35, 35, '342', 'Martinez', 'Llopi03', '42323', '/assets/artistas/1742909012480.png'),
(36, 36, '342', 'Martinez', 'Llopi03', '42323', '/assets/artistas/1742909168802.png'),
(37, 37, '342', 'Martinez', 'Llopi03', '42323', '/assets/artistas/1742909231976.png'),
(38, 38, '342', 'Martinez', 'Llopi03', '42323', '/assets/artistas/1742909276304.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disenyos`
--

CREATE TABLE `disenyos` (
  `idDisenyo` int(11) NOT NULL,
  `imgDisenyo` varchar(45) DEFAULT NULL,
  `descrip` varchar(45) DEFAULT NULL,
  `idArtista` int(11) NOT NULL,
  `fechaCreacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `disenyos`
--

INSERT INTO `disenyos` (`idDisenyo`, `imgDisenyo`, `descrip`, `idArtista`, `fechaCreacion`) VALUES
(53, '435fd', 'dfg', 32, '2025-03-25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disenyo_estilos`
--

CREATE TABLE `disenyo_estilos` (
  `idDisenyo` int(11) NOT NULL,
  `idEstilo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `disenyo_estilos`
--

INSERT INTO `disenyo_estilos` (`idDisenyo`, `idEstilo`) VALUES
(53, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoreserva`
--

CREATE TABLE `estadoreserva` (
  `idEstado` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descrip` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estadoreserva`
--

INSERT INTO `estadoreserva` (`idEstado`, `nombre`, `descrip`) VALUES
(1, 'Pendiente', 'Reserva no confirmada'),
(2, 'Confirmada', 'Reserva confirmada'),
(3, 'Cancelada', 'Reserva cancelada por el cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estilos`
--

CREATE TABLE `estilos` (
  `idEstilo` int(11) NOT NULL,
  `nombreEstilo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estilos`
--

INSERT INTO `estilos` (`idEstilo`, `nombreEstilo`) VALUES
(2, 'Cubismo'),
(3, 'Expresionismo'),
(8, 'ilowa'),
(1, 'Surrealismo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `idReserva` int(11) NOT NULL,
  `idArtista` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `fechaReserva` datetime NOT NULL,
  `detalles` varchar(255) DEFAULT NULL,
  `boceto` varchar(255) DEFAULT NULL,
  `idEstado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descrip` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `nombre`, `descrip`) VALUES
(1, 'Cliente', 'Usuario que solicita servicios'),
(2, 'Administrador', 'Usuario con privilegios elevados'),
(3, 'Artista', 'ARTISTA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `contrasena`, `rol`) VALUES
(1, 'Juan', 'Pérez García', 'nigger@gmail.com', '1234', 1),
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
(38, '342', 'Martinez', '44465444444@gmail.com', '24342', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `artistas`
--
ALTER TABLE `artistas`
  ADD PRIMARY KEY (`idArtista`),
  ADD KEY `fk_artistas_usuarios` (`idUsuario`);

--
-- Indices de la tabla `disenyos`
--
ALTER TABLE `disenyos`
  ADD PRIMARY KEY (`idDisenyo`),
  ADD KEY `idArtista` (`idArtista`);

--
-- Indices de la tabla `disenyo_estilos`
--
ALTER TABLE `disenyo_estilos`
  ADD PRIMARY KEY (`idDisenyo`,`idEstilo`),
  ADD KEY `disenyo_estilos_ibfk_2` (`idEstilo`);

--
-- Indices de la tabla `estadoreserva`
--
ALTER TABLE `estadoreserva`
  ADD PRIMARY KEY (`idEstado`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `estilos`
--
ALTER TABLE `estilos`
  ADD PRIMARY KEY (`idEstilo`),
  ADD UNIQUE KEY `nombreEstilo` (`nombreEstilo`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`idReserva`),
  ADD KEY `reservas_ibfk_1` (`idArtista`),
  ADD KEY `reservas_ibfk_2` (`idCliente`),
  ADD KEY `reservas_ibfk_3` (`idEstado`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `usuarios_ibfk_1` (`rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `artistas`
--
ALTER TABLE `artistas`
  MODIFY `idArtista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `disenyos`
--
ALTER TABLE `disenyos`
  MODIFY `idDisenyo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `estadoreserva`
--
ALTER TABLE `estadoreserva`
  MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estilos`
--
ALTER TABLE `estilos`
  MODIFY `idEstilo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `idReserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `artistas`
--
ALTER TABLE `artistas`
  ADD CONSTRAINT `fk_artistas_usuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `disenyos`
--
ALTER TABLE `disenyos`
  ADD CONSTRAINT `disenyos_ibfk_1` FOREIGN KEY (`idArtista`) REFERENCES `artistas` (`idArtista`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `disenyo_estilos`
--
ALTER TABLE `disenyo_estilos`
  ADD CONSTRAINT `disenyo_estilos_ibfk_1` FOREIGN KEY (`idDisenyo`) REFERENCES `disenyos` (`idDisenyo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `disenyo_estilos_ibfk_2` FOREIGN KEY (`idEstilo`) REFERENCES `estilos` (`idEstilo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`idArtista`) REFERENCES `artistas` (`idArtista`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`idEstado`) REFERENCES `estadoreserva` (`idEstado`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
