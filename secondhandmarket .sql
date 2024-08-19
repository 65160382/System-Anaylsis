-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2024 at 06:35 PM
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
-- Database: `secondhandmarket`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `Address_id` int(11) NOT NULL,
  `Customer_id` int(11) NOT NULL,
  `address` varchar(50) NOT NULL,
  `district` varchar(45) NOT NULL,
  `province` varchar(45) NOT NULL,
  `zipcode` int(11) NOT NULL,
  `country` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`Address_id`, `Customer_id`, `address`, `district`, `province`, `zipcode`, `country`) VALUES
(1, 1, 'หอพักสบายดี ซอยซอยนกคุ้มหลี ต.แสนสุข', 'เมืองชลบุรี', 'ชลบุรี', 20130, 'ประเทศไทย');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `Customer_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `registration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Customer_id`, `first_name`, `last_name`, `email`, `phone`, `registration_date`) VALUES
(1, 'admin', 'admin', '121@go.buu.ac.th', '1234', '0000-00-00'),
(2, 'admin2', 'admin2', '122@go.buu.ac.th', '1235', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `Customer_id` int(11) NOT NULL,
  `Product_id` int(11) NOT NULL,
  `Order_id` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  `order_date` date DEFAULT NULL,
  `Payment_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`Customer_id`, `Product_id`, `Order_id`, `status`, `order_date`, `Payment_id`, `created_at`, `updated_at`, `quantity`) VALUES
(1, 1, 1, 'pending', '2024-08-17', 1, '2024-08-17 13:39:39', '2024-08-17 13:39:39', 2),
(1, 1, 2, 'open', '2024-08-17', 2, '2024-08-17 14:13:19', '2024-08-17 14:13:19', 1),
(2, 11, 3, 'open', '2024-08-17', 3, '2024-08-17 14:19:05', '2024-08-17 14:19:05', 1),
(2, 1, 4, 'open', '2024-08-17', 4, '2024-08-17 14:40:17', '2024-08-17 14:40:17', 1),
(2, 1, 5, 'open', '2024-08-17', 5, '2024-08-17 15:19:09', '2024-08-17 15:19:09', 5),
(1, 1, 6, 'open', '2024-08-17', 7, '2024-08-17 16:27:56', '2024-08-17 16:27:56', 1),
(1, 1, 7, 'open', '2024-08-19', 8, '2024-08-19 14:28:04', '2024-08-19 14:28:04', 3),
(1, 11, 8, 'open', '2024-08-19', 9, '2024-08-19 14:53:04', '2024-08-19 14:53:04', 4);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `Payment_id` int(11) NOT NULL,
  `Customer_id` int(11) NOT NULL,
  `payment_method` varchar(45) NOT NULL,
  `amount` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`Payment_id`, `Customer_id`, `payment_method`, `amount`, `created_at`, `updated_at`) VALUES
(1, 1, 'credit-card', 200, '2024-08-17 13:28:24', '2024-08-17 13:28:24'),
(2, 1, 'credit-card', 699, '2024-08-17 14:13:19', '2024-08-17 14:13:19'),
(3, 2, 'promptpay', 39, '2024-08-17 14:19:05', '2024-08-17 14:19:05'),
(4, 2, 'qr-payment', 699, '2024-08-17 14:40:17', '2024-08-17 14:40:17'),
(5, 2, 'internet-banking', 3495, '2024-08-17 15:19:09', '2024-08-17 15:19:09'),
(6, 1, 'qr-payment', 699, '2024-08-17 16:25:11', '2024-08-17 16:25:11'),
(7, 1, 'credit-card', 699, '2024-08-17 16:27:56', '2024-08-17 16:27:56'),
(8, 1, 'bank-transfer', 2097, '2024-08-19 14:28:04', '2024-08-19 14:28:04'),
(9, 1, 'promptpay', 156, '2024-08-19 14:53:04', '2024-08-19 14:53:04');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Product_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`Product_id`, `name`, `price`, `description`, `image`, `stock`, `created_at`, `updated_at`) VALUES
(1, 'Iphone 14 Promax', 699, 'Latest smartphone with advanced features', 'https://media.education.studio7thailand.com/57312/iPhone_14_Pro_Max_Gold_PDP_Image_Position-1A_Gold_2-square_medium.jpg', 87, '2024-08-02 16:51:47', '2024-08-19 14:28:04'),
(2, 'Acer Nitro V 15 ', 1199, 'High-performance laptop for gaming and work', 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2023/08/Product/acer-nitro-16-an16-41-r12p-gaming-notebook-back-left-view.jpg', 50, '2024-08-02 16:51:47', '2024-08-15 13:22:57'),
(3, 'Wireless Earbuds', 149, 'Noise-cancelling wireless earbuds with long battery life', 'https://www.yamaha.com/yamahavgn/PIM/Images/01-TW-E3B-Black-03_1fb09687cc38d06d4cb325ec931685c4.jpg', 200, '2024-08-02 16:51:47', '2024-08-03 14:13:32'),
(4, 'Smartwatch 5', 299, 'Smartwatch with health tracking features', 'https://media-cdn.bnn.in.th/365240/xiaomi-redmi-watch-4-obsidian-black-1-square_medium.jpg', 150, '2024-08-02 16:51:47', '2024-08-03 14:14:04'),
(5, '4K TV', 799, 'Ultra HD 4K TV with vibrant colors and smart features', 'https://www.dohome.co.th/media/catalog/product/cache/e446f15aaa8dc66b80b7a0df334f7c5a/1/0/10307256_mc_1200_1.jpg', 80, '2024-08-02 16:51:47', '2024-08-15 13:21:06'),
(6, 'Bluetooth Speaker', 99, 'Portable Bluetooth speaker with powerful sound', 'https://soundcore.ph/cdn/shop/products/22391aedb46430f25929321d1cb298a5.jpg?v=1657179624&width=1024', 250, '2024-08-02 16:51:47', '2024-08-03 14:15:26'),
(7, 'Digital Camera', 499, 'High-resolution digital camera for professional photography', 'https://ph-live-01.slatic.net/p/a5f87dae05e40bece0871f637d357c9b.jpg', 60, '2024-08-02 16:51:47', '2024-08-03 14:16:07'),
(8, 'Gaming Console', 399, 'Next-gen gaming console with immersive graphics', 'https://media.studio7thailand.com/21160/Switch-H-New-Nintendo-Switch-Console-Neon-Red-Blue-1-square_medium.jpg', 120, '2024-08-02 16:51:47', '2024-08-03 14:16:37'),
(9, 'Ipad Pro', 599, 'Powerful tablet with large display and stylus support', 'https://media.studio7thailand.com/81576/iPad_Pro_Cellular_12-9_in_6th_Gen_Space_Gray_5G_2-square_medium.jpg', 90, '2024-08-02 16:51:47', '2024-08-15 13:22:12'),
(10, 'Fitness Tracker', 129, 'Wearable fitness tracker with heart rate monitoring', 'https://i.ebayimg.com/images/g/z2cAAOSwTF9djg1i/s-l1600.jpg', 180, '2024-08-02 16:51:47', '2024-08-03 14:19:23'),
(11, 'ยาดมหงส์ไทย', 39, 'ยาดมผสมสมุนไพรหมักนานาชนิดต้นตำรับภูมิปัญญาไทยที่กลิ่นฮิตติดจมูกใครหลาย ๆ คน เหมาะกับทุกเพศทุกวัย', 'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/89/88/8859126000089/8859126000089_1-20230802150139-.jpg', 15, '2024-08-15 14:24:52', '2024-08-19 14:53:04'),
(12, 'White T-Shirt', 20, '100% organic cotton T-shirt. Perfect for casual wear. Sizes S to XXL.', 'https://img.lazcdn.com/g/ff/kf/S4ce2136123b94cd9abd16abbc40ebf2dD.jpg_960x960q80.jpg_.webp', 100, '2024-08-16 09:47:34', '2024-08-16 09:47:34'),
(13, 'Denim Jacket', 10, 'Durable denim jacket with button-up front and chest pockets. Sizes XS to XL', 'https://th.mlb-korea.com/cdn/shop/files/8809947340314_01_JPG_e84c61c3-0bfd-4941-8255-eef289a3a2bc.jpg?v=1721012513', 50, '2024-08-16 09:49:07', '2024-08-16 09:52:19');

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `Register_id` int(11) NOT NULL,
  `Customer_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `regis_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`Register_id`, `Customer_id`, `username`, `password`, `regis_date`) VALUES
(1, 1, 'admin1', '1234', '2024-08-15'),
(2, 2, 'admin2', '1234', '2024-08-17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`Address_id`),
  ADD KEY `fk_address_customer1_idx` (`Customer_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`Customer_id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`Order_id`),
  ADD KEY `fk_Customer_has_Products_Products1_idx` (`Product_id`),
  ADD KEY `fk_Customer_has_Products_Customer_idx` (`Customer_id`),
  ADD KEY `fk_Order_Payments1_idx` (`Payment_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`Payment_id`),
  ADD KEY `fk_Payments_Customer1_idx` (`Customer_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Product_id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`Register_id`),
  ADD KEY `fk_register_customer_idx` (`Customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `Order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `Payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `Product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `Register_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_address_customer1` FOREIGN KEY (`Customer_id`) REFERENCES `customer` (`Customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `fk_Customer_has_Products_Customer` FOREIGN KEY (`Customer_id`) REFERENCES `customer` (`Customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Customer_has_Products_Products1` FOREIGN KEY (`Product_id`) REFERENCES `products` (`Product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Order_Payments1` FOREIGN KEY (`Payment_id`) REFERENCES `payments` (`Payment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_Payments_Customer1` FOREIGN KEY (`Customer_id`) REFERENCES `customer` (`Customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `register`
--
ALTER TABLE `register`
  ADD CONSTRAINT `fk_register_customer` FOREIGN KEY (`Customer_id`) REFERENCES `customer` (`Customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
