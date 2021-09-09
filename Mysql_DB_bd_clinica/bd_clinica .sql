-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-09-2021 a las 11:16:53
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_clinica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

CREATE TABLE `consulta` (
  `ID` int(11) NOT NULL,
  `ID_PACIENTE` bigint(11) NOT NULL,
  `ID_PROFESIONAL` int(11) NOT NULL,
  `ID_ESTADO` int(11) NOT NULL DEFAULT 3,
  `ID_TIPO_CONSULTA` int(11) NOT NULL,
  `FECHA` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dieta`
--

CREATE TABLE `dieta` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPCION` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `dieta`
--

INSERT INTO `dieta` (`ID`, `NOMBRE`, `DESCRIPCION`) VALUES
(1, 'Bajar de peso', 'Comer alimentos que le entregan muchos nutrientes sin demasiadas calorías extra\r\nEvite las calorías vacías o huecas\r\nPrefiera alimentos bajos en colesterol y grasa'),
(2, 'subir de peso', 'Agregue calorías saludables.\r\nOpte por alimentos ricos en nutrientes\r\nNo restrinja la merienda'),
(3, 'Sin dieta', 'Ninguna');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(80) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`ID`, `NOMBRE`) VALUES
(1, 'OCUPADO'),
(2, 'DESOCUPADO'),
(3, 'ESPERA DE ATENCION AL PACIENTE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historia_clinica`
--

CREATE TABLE `historia_clinica` (
  `ID` int(11) NOT NULL,
  `ID_CONSULTA` int(11) NOT NULL,
  `ID_PACIENTE` bigint(11) NOT NULL,
  `PESO_ESTATURA` int(11) DEFAULT NULL,
  `FUMADOR` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ANHOS_FUMANDO` int(11) DEFAULT NULL,
  `ID_DIETA` int(11) DEFAULT 3,
  `FECHA` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `ID` int(11) NOT NULL,
  `NUMERO_DOCUMENTO` bigint(11) NOT NULL,
  `TIPO_DOCUMENTO` char(3) COLLATE utf8_unicode_ci NOT NULL,
  `NOMBRE` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `FECHA_NACIMIENTO` date NOT NULL,
  `PRIORIDAD` int(11) NOT NULL DEFAULT 2,
  `RIESGO` double NOT NULL DEFAULT 0.68
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesional`
--

CREATE TABLE `profesional` (
  `ID` int(11) NOT NULL,
  `NUMERO_DOCUMENTO` int(11) NOT NULL,
  `TIPO_DOCUMENTO` char(3) COLLATE utf8_unicode_ci NOT NULL,
  `NOMBRE` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `FECHA_NACIMIENTO` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `profesional`
--

INSERT INTO `profesional` (`ID`, `NUMERO_DOCUMENTO`, `TIPO_DOCUMENTO`, `NOMBRE`, `FECHA_NACIMIENTO`) VALUES
(2, 1090524417, 'C.C', 'Javier Becerra', '1999-01-02'),
(3, 1090519417, 'C.C', 'Dayana Garzon', '1998-09-09'),
(4, 1090564741, 'C.C', 'Michael Vega', '1991-07-25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_consulta`
--

CREATE TABLE `tipo_consulta` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(80) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_consulta`
--

INSERT INTO `tipo_consulta` (`ID`, `NOMBRE`) VALUES
(1, 'PEDIATRIA'),
(2, 'URGENCIAS'),
(3, 'MEDICINA INTEGRAL (MI)');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_ID_PROFESIONAL` (`ID_PROFESIONAL`) USING BTREE,
  ADD KEY `FK_ID_TIPO_CONSULTA` (`ID_TIPO_CONSULTA`) USING BTREE,
  ADD KEY `FK_ID_ESTADO` (`ID_ESTADO`) USING BTREE,
  ADD KEY `FK_ID_PACIENTE` (`ID_PACIENTE`);

--
-- Indices de la tabla `dieta`
--
ALTER TABLE `dieta`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_ID_PACIENTE` (`ID_PACIENTE`),
  ADD KEY `FK_ID_DIETA` (`ID_DIETA`),
  ADD KEY `FK_ID_CONSULTA` (`ID_CONSULTA`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NUMERO_DOCUMENTO` (`NUMERO_DOCUMENTO`);

--
-- Indices de la tabla `profesional`
--
ALTER TABLE `profesional`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NUMERO_DOCUMENTO` (`NUMERO_DOCUMENTO`);

--
-- Indices de la tabla `tipo_consulta`
--
ALTER TABLE `tipo_consulta`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consulta`
--
ALTER TABLE `consulta`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- AUTO_INCREMENT de la tabla `dieta`
--
ALTER TABLE `dieta`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `profesional`
--
ALTER TABLE `profesional`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_consulta`
--
ALTER TABLE `tipo_consulta`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `consulta_ibfk_2` FOREIGN KEY (`ID_TIPO_CONSULTA`) REFERENCES `tipo_consulta` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `consulta_ibfk_3` FOREIGN KEY (`ID_PROFESIONAL`) REFERENCES `profesional` (`NUMERO_DOCUMENTO`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `consulta_ibfk_4` FOREIGN KEY (`ID_ESTADO`) REFERENCES `estado` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `consulta_ibfk_5` FOREIGN KEY (`ID_PACIENTE`) REFERENCES `paciente` (`NUMERO_DOCUMENTO`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD CONSTRAINT `historia_clinica_ibfk_3` FOREIGN KEY (`ID_PACIENTE`) REFERENCES `paciente` (`NUMERO_DOCUMENTO`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historia_clinica_ibfk_4` FOREIGN KEY (`ID_DIETA`) REFERENCES `dieta` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historia_clinica_ibfk_5` FOREIGN KEY (`ID_CONSULTA`) REFERENCES `consulta` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
