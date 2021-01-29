-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2021 at 09:15 AM
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
-- Table structure for table `test_history`
--

CREATE TABLE `test_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `timestamp` datetime DEFAULT NULL,
  `score` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test_history`
--

INSERT INTO `test_history` (`id`, `user_id`, `topic_id`, `timestamp`, `score`) VALUES
(8, 81271, 0, '2021-01-29 09:08:47', '2/3'),
(9, 81271, 0, '2021-01-29 09:09:00', '1/2'),
(10, 81319, 0, '2021-01-29 09:12:45', '1/2'),
(11, 81319, 0, '2021-01-29 09:13:20', '6/10'),
(12, 80995, 0, '2021-01-29 09:13:46', '1/3'),
(13, 80995, 0, '2021-01-29 09:13:58', '1/2'),
(14, 81638, 0, '2021-01-29 09:14:23', '1/2'),
(15, 81638, 0, '2021-01-29 09:14:43', '5/10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `test_history`
--
ALTER TABLE `test_history`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `test_history`
--
ALTER TABLE `test_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
