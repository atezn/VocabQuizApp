-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2025 at 07:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vocab_uni_db`
--
CREATE DATABASE IF NOT EXISTS `vocab_uni_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vocab_uni_db`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'General'),
(2, 'Business'),
(3, 'Health');

-- --------------------------------------------------------

--
-- Table structure for table `contact_requests`
--

DROP TABLE IF EXISTS `contact_requests`;
CREATE TABLE `contact_requests` (
  `request_id` int(11) NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `contact_info_combined` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_requests`
--

INSERT INTO `contact_requests` (`request_id`, `user_name`, `message`, `contact_info_combined`) VALUES
(1, 'Professor', 'Bad table design', 'professor@uni.edu'),
(2, 'Professor Temp', 'temp professor tries to send', 'prof2@uni.edu, 123-145, text');

-- --------------------------------------------------------

--
-- Table structure for table `daily_scorecard`
--

DROP TABLE IF EXISTS `daily_scorecard`;
CREATE TABLE `daily_scorecard` (
  `scorecard_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_recorded` date NOT NULL,
  `total_seen` int(11) DEFAULT 0,
  `total_correct` int(11) DEFAULT 0,
  `total_wrong` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `daily_scorecard`
--

INSERT INTO `daily_scorecard` (`scorecard_id`, `user_id`, `date_recorded`, `total_seen`, `total_correct`, `total_wrong`) VALUES
(1, 2, '2025-12-13', 61, 6, 55),
(62, 2, '2025-12-14', 4, 3, 1),
(66, 1, '2023-12-10', 10, 8, 2),
(67, 1, '2023-12-11', 15, 5, 10),
(68, 1, '2023-12-12', 20, 20, 0),
(69, 2, '2025-12-16', 5, 1, 4),
(74, 3, '2025-12-17', 4, 2, 2),
(78, 4, '2025-12-23', 5, 3, 2),
(83, 5, '2025-12-23', 8, 4, 4),
(91, 2, '2025-12-23', 2, 1, 1),
(93, 2, '2025-12-24', 6, 0, 6),
(99, 4, '2025-12-24', 3, 3, 0),
(102, 7, '2025-12-24', 1, 0, 1),
(103, 8, '2025-12-24', 4, 1, 3),
(107, 7, '2025-12-25', 6, 3, 3),
(113, 8, '2025-12-25', 14, 7, 7),
(127, 2, '2025-12-25', 10, 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_history`
--

DROP TABLE IF EXISTS `quiz_history`;
CREATE TABLE `quiz_history` (
  `history_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `word_id` int(11) NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `quiz_mode` enum('quiz','review') NOT NULL,
  `attempt_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_history`
--

INSERT INTO `quiz_history` (`history_id`, `user_id`, `word_id`, `is_correct`, `quiz_mode`, `attempt_at`) VALUES
(71, 3, 2, 1, 'quiz', '2025-12-17 20:10:07'),
(72, 3, 8, 0, 'quiz', '2025-12-17 20:11:25'),
(73, 3, 1, 0, 'quiz', '2025-12-17 20:11:31'),
(74, 3, 3, 1, 'quiz', '2025-12-17 20:11:34'),
(75, 4, 1, 1, 'quiz', '2025-12-23 09:33:13'),
(76, 4, 9, 1, 'quiz', '2025-12-23 09:33:17'),
(77, 4, 6, 1, 'quiz', '2025-12-23 09:33:23'),
(78, 4, 8, 0, 'quiz', '2025-12-23 09:33:26'),
(79, 4, 2, 0, 'quiz', '2025-12-23 09:33:28'),
(80, 5, 1, 0, 'quiz', '2025-12-23 12:20:37'),
(81, 5, 6, 1, 'quiz', '2025-12-23 12:20:42'),
(82, 5, 2, 0, 'quiz', '2025-12-23 12:20:47'),
(83, 5, 8, 0, 'quiz', '2025-12-23 12:20:50'),
(84, 5, 3, 1, 'quiz', '2025-12-23 12:20:56'),
(85, 5, 9, 1, 'quiz', '2025-12-23 12:21:00'),
(86, 5, 4, 1, 'quiz', '2025-12-23 12:21:04'),
(87, 5, 8, 0, 'quiz', '2025-12-23 12:21:31'),
(96, 4, 4, 1, 'quiz', '2025-12-24 16:31:07'),
(97, 4, 10, 1, 'quiz', '2025-12-24 16:31:09'),
(98, 4, 3, 1, 'quiz', '2025-12-24 16:31:12'),
(99, 7, 1, 0, 'quiz', '2025-12-24 17:16:00'),
(100, 8, 6, 1, 'quiz', '2025-12-24 17:35:39'),
(101, 8, 9, 0, 'quiz', '2025-12-24 17:36:39'),
(102, 8, 3, 0, 'quiz', '2025-12-24 17:36:48'),
(103, 8, 1, 0, 'quiz', '2025-12-24 17:57:23'),
(104, 7, 6, 1, 'quiz', '2025-12-24 21:41:14'),
(105, 7, 10, 0, 'quiz', '2025-12-24 21:41:19'),
(106, 7, 2, 1, 'quiz', '2025-12-24 21:41:23'),
(107, 7, 4, 1, 'quiz', '2025-12-24 21:43:56'),
(108, 7, 9, 0, 'quiz', '2025-12-24 21:44:21'),
(109, 7, 8, 0, 'quiz', '2025-12-24 21:44:27'),
(110, 8, 10, 0, 'quiz', '2025-12-25 08:31:05'),
(111, 8, 8, 1, 'quiz', '2025-12-25 08:31:09'),
(112, 8, 2, 0, 'quiz', '2025-12-25 08:31:13'),
(113, 8, 4, 0, 'quiz', '2025-12-25 08:31:18'),
(114, 8, 11, 1, 'quiz', '2025-12-25 08:31:23'),
(115, 8, 12, 0, 'quiz', '2025-12-25 08:34:00'),
(116, 8, 36, 1, 'quiz', '2025-12-25 08:39:54'),
(117, 8, 26, 1, 'quiz', '2025-12-25 08:39:58'),
(118, 8, 38, 0, 'quiz', '2025-12-25 09:45:28'),
(119, 8, 16, 1, 'quiz', '2025-12-25 09:45:40'),
(120, 8, 22, 1, 'quiz', '2025-12-25 12:39:15'),
(121, 8, 21, 1, 'quiz', '2025-12-25 12:47:17'),
(122, 8, 43, 0, 'quiz', '2025-12-25 12:47:27'),
(123, 8, 17, 0, 'quiz', '2025-12-25 13:09:06'),
(124, 2, 18, 0, 'quiz', '2025-12-25 13:12:27'),
(125, 2, 34, 0, 'quiz', '2025-12-25 13:12:34'),
(126, 2, 2, 0, 'quiz', '2025-12-25 13:12:37'),
(127, 2, 31, 1, 'quiz', '2025-12-25 13:12:40'),
(128, 2, 13, 1, 'quiz', '2025-12-25 13:12:43'),
(129, 2, 35, 1, 'quiz', '2025-12-25 13:12:48'),
(130, 2, 8, 1, 'quiz', '2025-12-25 13:12:54'),
(131, 2, 39, 1, 'quiz', '2025-12-25 13:31:51'),
(132, 2, 12, 0, 'quiz', '2025-12-25 13:31:57'),
(133, 2, 17, 0, 'quiz', '2025-12-25 17:37:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password_hash`, `created_at`) VALUES
(1, 'admin', 'admin@vocab.com', 'hashed_secret_123', '2025-12-09 11:24:28'),
(2, 'TestStudent', 'student@uni.edu', '$2a$11$TIX3PG3M.IRDRkPLvmzb9.Fff7XMEPYupKWhcqg/wl6zad9.r4II.', '2025-12-09 14:34:34'),
(3, 'abidin', 'abidin@gmail.com', '$2a$11$sxI80R52wQ0KaRdxUHAtZex2fsoXrbQhpDc6AlideP71hooXdpuXG', '2025-12-17 20:09:54'),
(4, 'fatih', 'fatih@hotmail.com', '$2a$11$wPokjLqu/UGg2.iixTrvee1Wzls5B7wfcs4jXSTLyskAKHhm/G3JS', '2025-12-23 09:33:01'),
(5, 'serat', 'serat@hotmail.com', '$2a$11$0M/F/OlZ625oKTdo.RJpeeVBtSYLY7aKw3oNYl0r7Sv8XBGEnYScW', '2025-12-23 12:20:23'),
(6, 'tempuser', 'tem@yahoo.xyz', '$2a$11$fAH1gEdTVpFuWqvtkl0ifuc9rSX81AzFrzKQsfASpcoTqrpgEtxzO', '2025-12-24 17:04:00'),
(7, 'quiz', 'quiz', '$2a$11$Xm5iv226tlleBbz5ge.x8esUw.bPYLCV2b1drP3wCRX2Xa7Se2vQ2', '2025-12-24 17:09:35'),
(8, 'sunum', 'sunum@hotmail.com', '$2a$11$DxgVsNKTfdomkOjwKLaq4ewbQTJXyFTQ5frtEDrZLpZun/iExL/Qa', '2025-12-24 17:32:25');

-- --------------------------------------------------------

--
-- Table structure for table `user_word_progress`
--

DROP TABLE IF EXISTS `user_word_progress`;
CREATE TABLE `user_word_progress` (
  `progress_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `word_id` int(11) NOT NULL,
  `status` enum('review','mastered') NOT NULL,
  `streak` int(11) DEFAULT 0,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_word_progress`
--

INSERT INTO `user_word_progress` (`progress_id`, `user_id`, `word_id`, `status`, `streak`, `last_updated`) VALUES
(23, 3, 2, 'mastered', 0, '2025-12-17 20:10:07'),
(24, 3, 8, 'review', 0, '2025-12-17 20:11:25'),
(25, 3, 1, 'review', 0, '2025-12-17 20:11:31'),
(26, 3, 3, 'mastered', 0, '2025-12-17 20:11:34'),
(27, 4, 1, 'mastered', 0, '2025-12-23 09:33:12'),
(28, 4, 9, 'mastered', 0, '2025-12-23 09:33:17'),
(29, 4, 6, 'mastered', 0, '2025-12-23 09:33:23'),
(30, 4, 8, 'review', 0, '2025-12-23 09:33:26'),
(31, 4, 2, 'review', 0, '2025-12-23 09:33:28'),
(32, 5, 1, 'review', 0, '2025-12-23 12:20:37'),
(33, 5, 6, 'mastered', 0, '2025-12-23 12:20:42'),
(34, 5, 2, 'review', 0, '2025-12-23 12:20:47'),
(35, 5, 8, 'review', 0, '2025-12-23 12:20:50'),
(36, 5, 3, 'mastered', 0, '2025-12-23 12:20:56'),
(37, 5, 9, 'mastered', 0, '2025-12-23 12:21:00'),
(38, 5, 4, 'mastered', 0, '2025-12-23 12:21:04'),
(40, 4, 4, 'mastered', 0, '2025-12-24 16:31:07'),
(41, 4, 10, 'mastered', 0, '2025-12-24 16:31:09'),
(42, 4, 3, 'mastered', 0, '2025-12-24 16:31:12'),
(43, 7, 1, 'review', 0, '2025-12-24 17:16:00'),
(44, 8, 6, 'mastered', 0, '2025-12-24 17:35:39'),
(45, 8, 9, 'review', 0, '2025-12-24 17:36:39'),
(46, 8, 3, 'review', 0, '2025-12-24 17:36:48'),
(47, 8, 1, 'review', 0, '2025-12-24 17:57:23'),
(48, 7, 6, 'mastered', 0, '2025-12-24 21:41:14'),
(49, 7, 10, 'review', 0, '2025-12-24 21:41:19'),
(50, 7, 2, 'mastered', 0, '2025-12-24 21:41:23'),
(51, 7, 4, 'mastered', 0, '2025-12-24 21:43:56'),
(52, 7, 9, 'review', 0, '2025-12-24 21:44:21'),
(53, 7, 8, 'review', 0, '2025-12-24 21:44:27'),
(54, 8, 10, 'review', 0, '2025-12-25 08:31:05'),
(55, 8, 8, 'mastered', 0, '2025-12-25 08:31:09'),
(56, 8, 2, 'review', 0, '2025-12-25 08:31:12'),
(57, 8, 4, 'review', 0, '2025-12-25 08:31:18'),
(58, 8, 11, 'mastered', 0, '2025-12-25 08:31:23'),
(59, 8, 12, 'review', 0, '2025-12-25 08:34:00'),
(60, 8, 36, 'mastered', 0, '2025-12-25 08:39:54'),
(61, 8, 26, 'mastered', 0, '2025-12-25 08:39:58'),
(62, 8, 38, 'review', 0, '2025-12-25 09:45:28'),
(63, 8, 16, 'mastered', 0, '2025-12-25 09:45:40'),
(64, 8, 22, 'mastered', 0, '2025-12-25 12:39:15'),
(65, 8, 21, 'mastered', 0, '2025-12-25 12:47:17'),
(66, 8, 43, 'review', 0, '2025-12-25 12:47:27'),
(67, 8, 17, 'review', 0, '2025-12-25 13:09:06'),
(68, 2, 18, 'review', 0, '2025-12-25 13:12:27'),
(69, 2, 34, 'review', 0, '2025-12-25 13:12:34'),
(70, 2, 2, 'review', 0, '2025-12-25 13:12:37'),
(71, 2, 31, 'mastered', 0, '2025-12-25 13:12:40'),
(72, 2, 13, 'mastered', 0, '2025-12-25 13:12:43'),
(73, 2, 35, 'mastered', 0, '2025-12-25 13:12:48'),
(74, 2, 8, 'mastered', 0, '2025-12-25 13:12:54'),
(75, 2, 39, 'mastered', 0, '2025-12-25 13:31:51'),
(76, 2, 12, 'review', 0, '2025-12-25 13:31:57'),
(77, 2, 17, 'review', 0, '2025-12-25 17:37:42');

-- --------------------------------------------------------

--
-- Table structure for table `words`
--

DROP TABLE IF EXISTS `words`;
CREATE TABLE `words` (
  `word_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `root_word_id` int(11) DEFAULT NULL,
  `english_word` varchar(100) NOT NULL,
  `turkish_meaning` varchar(255) NOT NULL,
  `cefr_level` enum('A1','A2','B1','B2','C1','C2') NOT NULL,
  `created_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `words`
--

INSERT INTO `words` (`word_id`, `category_id`, `root_word_id`, `english_word`, `turkish_meaning`, `cefr_level`, `created_by`) VALUES
(1, 1, NULL, 'Apple', 'Elma', 'A1', NULL),
(2, 1, NULL, 'Run', 'Koşmak', 'A1', NULL),
(3, 2, NULL, 'Negotiate', 'Müzakere etmek', 'B2', NULL),
(4, 3, NULL, 'Surgery', 'Ameliyat', 'C1', NULL),
(6, 1, NULL, 'Freedom', 'Hürriyet', 'C1', 2),
(8, 1, NULL, 'Computer', 'Bilgisayar', 'B1', 2),
(9, 1, NULL, 'Book', 'Kitap', 'A1', 2),
(10, 1, NULL, 'Water', 'Su', 'A1', 2),
(11, 1, NULL, 'Wisdom', 'Bilgelik', 'B2', 2),
(12, 1, NULL, 'Presentation', 'Sunum', 'B1', 8),
(13, 1, NULL, 'Book', 'Kitap', 'A1', NULL),
(14, 1, NULL, 'Water', 'Su', 'A1', NULL),
(15, 1, NULL, 'House', 'Ev', 'A1', NULL),
(16, 1, NULL, 'School', 'Okul', 'A1', NULL),
(17, 1, NULL, 'Friend', 'Arkadaş', 'A1', NULL),
(18, 1, NULL, 'Weather', 'Hava Durumu', 'A2', NULL),
(19, 1, NULL, 'Decide', 'Karar Vermek', 'A2', NULL),
(20, 1, NULL, 'Dangerous', 'Tehlikeli', 'A2', NULL),
(21, 3, NULL, 'Nurse', 'Hemşire', 'A2', NULL),
(22, 3, NULL, 'Headache', 'Baş Ağrısı', 'A2', NULL),
(23, 1, NULL, 'Environment', 'Çevre', 'B1', NULL),
(24, 1, NULL, 'Government', 'Hükümet', 'B1', NULL),
(25, 2, NULL, 'Employee', 'Çalışan', 'B1', NULL),
(26, 2, NULL, 'Salary', 'Maaş', 'B1', NULL),
(27, 3, NULL, 'Treatment', 'Tedavi', 'B1', NULL),
(28, 2, NULL, 'Investment', 'Yatırım', 'B2', NULL),
(29, 2, NULL, 'Strategy', 'Strateji', 'B2', NULL),
(30, 2, NULL, 'Negotiation', 'Müzakere', 'B2', NULL),
(31, 1, NULL, 'Significant', 'Önemli', 'B2', NULL),
(32, 1, NULL, 'Appropriate', 'Uygun', 'B2', NULL),
(33, 1, NULL, 'Comprehensive', 'Kapsamlı', 'C1', NULL),
(34, 1, NULL, 'Subsequent', 'Sonraki', 'C1', NULL),
(35, 3, NULL, 'Diagnosis', 'Teşhis', 'C1', NULL),
(36, 2, NULL, 'Revenue', 'Gelir / Hasılat', 'C1', NULL),
(37, 1, NULL, 'Inevitably', 'Kaçınılmaz olarak', 'C1', NULL),
(38, 1, NULL, 'Profound', 'Derin / Kapsamlı', 'C2', NULL),
(39, 1, NULL, 'Ambiguous', 'Muğlak / Belirsiz', 'C2', NULL),
(40, 1, NULL, 'Ephemeral', 'Geçici / Kısa süreli', 'C2', NULL),
(41, 2, NULL, 'Acquisition', 'Edinim / Devralma', 'C2', NULL),
(42, 3, NULL, 'Resilience', 'Direnç / Dayanıklılık', 'C2', NULL),
(43, 1, NULL, 'Serendipity', 'Mutlu Tesadüf', 'C2', NULL),
(44, 1, NULL, 'Meticulous', 'Titiz / İtinalı', 'C2', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `contact_requests`
--
ALTER TABLE `contact_requests`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `daily_scorecard`
--
ALTER TABLE `daily_scorecard`
  ADD PRIMARY KEY (`scorecard_id`),
  ADD UNIQUE KEY `unique_daily` (`user_id`,`date_recorded`);

--
-- Indexes for table `quiz_history`
--
ALTER TABLE `quiz_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `word_id` (`word_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_word_progress`
--
ALTER TABLE `user_word_progress`
  ADD PRIMARY KEY (`progress_id`),
  ADD UNIQUE KEY `unique_prog` (`user_id`,`word_id`),
  ADD KEY `word_id` (`word_id`);

--
-- Indexes for table `words`
--
ALTER TABLE `words`
  ADD PRIMARY KEY (`word_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `root_word_id` (`root_word_id`),
  ADD KEY `created_by` (`created_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contact_requests`
--
ALTER TABLE `contact_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `daily_scorecard`
--
ALTER TABLE `daily_scorecard`
  MODIFY `scorecard_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `quiz_history`
--
ALTER TABLE `quiz_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_word_progress`
--
ALTER TABLE `user_word_progress`
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `word_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `daily_scorecard`
--
ALTER TABLE `daily_scorecard`
  ADD CONSTRAINT `daily_scorecard_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `quiz_history`
--
ALTER TABLE `quiz_history`
  ADD CONSTRAINT `quiz_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quiz_history_ibfk_2` FOREIGN KEY (`word_id`) REFERENCES `words` (`word_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_word_progress`
--
ALTER TABLE `user_word_progress`
  ADD CONSTRAINT `user_word_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_word_progress_ibfk_2` FOREIGN KEY (`word_id`) REFERENCES `words` (`word_id`) ON DELETE CASCADE;

--
-- Constraints for table `words`
--
ALTER TABLE `words`
  ADD CONSTRAINT `words_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `words_ibfk_2` FOREIGN KEY (`root_word_id`) REFERENCES `words` (`word_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `words_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
