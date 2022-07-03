-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Júl 03. 16:47
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `contact_app`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `data`
--

CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `data`
--

INSERT INTO `data` (`id`, `name`, `img`, `phone`, `email`) VALUES
(1, 'Timothy Lewis', 'Timothy.png', '+36012345678', 'timothy.lewis@mail.com'),
(2, 'Sarah Wright', 'Sarah.png', '+36012345678', 'sarah.wright@mail.com'),
(3, 'Lucy Jones', 'Lucy.png', '+36012345678', 'lucy.jones@mail.com'),
(4, 'Jake Perez', 'Jake.png', '+36012345678', 'jake.perez@mail.com'),
(5, 'Adebayo Rodriguez', 'Adebayo.png', '+36012345678', 'adebayo.rodriguez@mail.com');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `data`
--
ALTER TABLE `data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
