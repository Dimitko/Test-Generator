-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2021 at 03:49 PM
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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `facultyNr` int(16) UNSIGNED NOT NULL,
  `topicID` int(16) UNSIGNED NOT NULL,
  `role` varchar(16) NOT NULL,
  `user_key` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`facultyNr`, `topicID`, `role`, `user_key`) VALUES
(0, 0, 'admin', 1111),
(11111, 1, 'student', 2347),
(22222, 2, 'student', 1444),
(33333, 3, 'student', 9287),
(44444, 15, 'student', 5647),
(80995, 5, 'student', 1478),
(81271, 10, 'student', 2346),
(81319, 12, 'student', 4578),
(81476, 16, 'student', 1647),
(81638, 9, 'student', 6234),
(81749, 15, 'student', 5124),
(82007, 13, 'student', 4159),
(82346, 23, 'student', 6547),
(84125, 0, 'student', 1564),
(84517, 2, 'student', 2397),
(85647, 23, 'student', 1245),
(86234, 0, 'student', 4123);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`facultyNr`),
  ADD KEY `topicNr` (`topicID`),
  ADD KEY `facultyNr` (`facultyNr`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
