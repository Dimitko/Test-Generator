-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2021 at 08:29 AM
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
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test_history`
--

INSERT INTO `test_history` (`id`, `user_id`, `topic_id`, `timestamp`, `score`) VALUES
(1, 81271, 0, '2021-01-29 08:23:25', 1),
(2, 81271, 0, '2021-01-29 08:23:50', 4),
(3, 80995, 0, '2021-01-29 08:24:49', 5),
(4, 80995, 0, '2021-01-29 08:25:02', 1),
(5, 81319, 0, '2021-01-29 08:25:33', 5),
(6, 84517, 0, '2021-01-29 08:26:48', 2),
(7, 84517, 0, '2021-01-29 08:27:18', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
