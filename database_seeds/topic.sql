-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2021 at 05:32 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testgenerator`
--

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `topicID` int(6) UNSIGNED NOT NULL,
  `title` text NOT NULL,
  `topicNumber` int(11) DEFAULT NULL,
  `extraInfo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`topicID`, `title`, `topicNumber`, `extraInfo`) VALUES
(0, 'Тестване', 666, 'Ще видим'),
(1, 'Изисквания', 0, 'Променят се'),
(2, 'Google - Web Performance Best ', 1, 'Заета'),
(3, 'HTML 5', 2, 'Част първа семантични тагове. Тагове за форми. Примери.'),
(4, 'Latex сравнение с HTML', 3, 'Заета'),
(5, 'CSS', 4, 'Стилове. Класове. Селектори.'),
(6, 'CSS', 5, 'Layouts. Box model.'),
(7, 'CSS', 6, 'Layouts. Flexbox.'),
(8, 'Анимации със CSS', 7, 'Използване на трансформации.'),
(9, 'Еммет синтаксис', 8, ''),
(10, 'Fetch API and XHR', 16, 'Трябва update!'),
(12, 'IP over Avian Carriers', 1990, 'https://en.wikipedia.org/wiki/IP_over_Avian_Carriers\n\nhttps://tools.ietf.org/html/rfc1149'),
(13, 'Power Rangers', 1993, 'https://en.wikipedia.org/wiki/Power_Rangers'),
(14, 'Power Rangers', 1993, 'https://en.wikipedia.org/wiki/Power_Rangers'),
(15, 'Title-1', 1000, 'Extra info for Title-1'),
(16, 'Title-2', 1001, 'Extra info for Title-2'),
(17, 'Title-3', 1003, ''),
(18, 'Тема 16', 1016, ''),
(23, 'Тема Тема Тема', 126, 'Линкове');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`topicID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `topicID` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
