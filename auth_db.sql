-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Jul 2023 pada 04.10
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('B3dTqAK68fGkPbs4MepEqZqdefBBcBAF', '2023-07-06 02:31:58', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"e0bed67d-96bf-4553-a93f-a641fa56ee7b\"}', '2023-07-04 06:44:56', '2023-07-05 02:31:58'),
('QJKPDmR5ZeJ5hTc55My95HLk0xMrFqJS', '2023-07-06 02:31:23', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"e0bed67d-96bf-4553-a93f-a641fa56ee7b\"}', '2023-07-05 01:04:22', '2023-07-05 02:31:23'),
('QnCU9l_fyku4WcdPm2tTisU5m8y9-DDy', '2023-07-05 06:44:38', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-04 06:19:04', '2023-07-04 06:44:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `nik` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `uuid`, `nik`, `name`, `avatar`, `email`, `password`, `position`, `gender`, `createdAt`, `updatedAt`) VALUES
(3, '8cfbfa3f-c060-4293-96e7-9fb0c36b6760', 3171084006060002, 'Ahmad Kasim Ridho Kedua', '', 'user@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$PZYSSw6bOUJo82G0sfWhow$N8YCV3MxX53ctahCMa22XNw8HgsTvVTjUqP/WeKC+NY', 'laksamana', 'male', '2023-07-02 07:19:27', '2023-07-04 06:56:34'),
(4, '4a50dc2e-2643-4766-8ead-fb134f988508', 3171073005050001, 'Muhammad Fadel Hafiz', '', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$zgr31sYuRfVuxJtDBovNfQ$+ObDfMZaBFnuJELBjo2Y8xMPH/HC4651VmUL+Zr2zo8', 'Admiral', 'Male', '2023-07-02 07:32:13', '2023-07-02 07:32:13'),
(10, 'e0bed67d-96bf-4553-a93f-a641fa56ee7b', 4242424224242224, 'Ahmad Kasim Cuiii', 'UPLOADS1688453078142-0.jpg', 'admin3@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$DzKVpC3mZQ0xdfamtaYDyA$0BPKlbPcAX/eU5dwnV09Uqm1gqb1XoLf2iPaHhEGrE8', 'Admiral', 'Male', '2023-07-04 06:44:38', '2023-07-05 02:31:23'),
(11, '204a8163-e2e9-4e7a-96ab-dd0962b5ee12', 4343434334343334, 'Ahmad Kasim Cui', 'UPLOADS1688519537193-0.jpg', 'admin1@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Yv76a6fdNqWt2zGRB0fDYA$z1YZTYXPopJgtOyGlbLnXMzLNJtAbThUEi5KZJkyYJw', 'Admiral', 'Female', '2023-07-05 01:12:17', '2023-07-05 01:12:17'),
(12, '2aa84864-1e94-4368-91e2-1d458ad9f07c', 4343434334343334, 'Ahmad Kasim Cuii', 'UPLOADS1688520298648-0.png', 'admin2@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ZrlhZtEXIX2bM2EHJ72Gow$nUULbo5JxvlHLvAaOWOkFx4u2nHPams1HVv0fmSjQEk', 'Admiral', 'Female', '2023-07-05 01:24:58', '2023-07-05 01:24:58');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
