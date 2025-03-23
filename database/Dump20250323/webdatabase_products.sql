-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: webdatabase
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `detail_desc` varchar(255) DEFAULT NULL,
  `factory` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `quantity` bigint NOT NULL,
  `short_desc` varchar(255) DEFAULT NULL,
  `sold` bigint NOT NULL,
  `target` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Intel i7-1255U, Ram 16GB DDR4, SSD 512GB, 15.6\' FHD 60Hz','Asus','https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/asus_vivobook_x1504za_nj1039w_7459424b00.png','Laptop Asus Vivobook',21490000,32,'A1407CA-LY008WS',15,'Laptop văn phòng'),(2,'intel core ultra 5, RAM 16GB DDR5, SSD 512GB, 14\' WUXGA 60Hz','Asus','https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/asus_vivobook_14_a1407_silver_1_c8553201b7.png','Laptop Asus Vivobook 14',21990000,59,'M1607KA-MB091WS',24,'Laptop văn phòng'),(3,'AMD Ryzen AI 7, RAM 16GB DDR4, SSD 512GB, 16\' WUXGA 60Hz','Asus','https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/asus_vivobook_16_m1607_silver_1_c8d3414c8f.png','Laptop Asus Vivobook 16',13790000,66,'X1504ZA-NJ517W',21,'Laptop văn phòng'),(4,'Intel i5-1255U, Ram 16GB DDR4, SSD 512GB, 15.6\' FHD 60Hz','Asus','https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2024_5_13_638512084168393633_X1504ZA-NJ517W.jpg','Laptop Asus Vivobook 15',17690000,231,'FA506NFR-HN006W',126,'Laptop gaming'),(5,'AMD Ryzen 7 7435HS, RAM 16GB, SSD 512GB DDR5, 15.6\' IPS  144HZ, RTX 2050','Asus','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/2024_6_20_638545034642835480_fa506nfr-hn006w.jpg','Asus TUF Gaming',23990000,266,'FA507NUR-LP101W',209,'Laptop gaming'),(6,'AMD Ryzen 7435HS, RAM 16GB DDR5, SSD 512GB, 15.6\' IPS 144Hz, RTX 4050','Asus','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/asus_tuf_gaming_a15_2023_jaeger_gray_22b3a74a4b.png','Laptop Asus TUF Gaming',14990000,312,'FA506NF-HN005W',255,'Laptop gaming'),(7,'AMD R5 7535HS, RAM 8GB DDR5, SSD 512GB, 15.6\' IPS 144HZ, RTX 2050','Asus','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/2024_2_16_638436898802594053_asus-tuf-gaming-a15-fa506nc-1.jpg','Laptop Asus TUF Gaming A15',25990000,40,'UX3405MA-PP151W',21,'Laptop văn phòng'),(8,'Intel Core ultra 5, Ram 16GB LPDDR5X, SSD 512GB, 14\' OLED 120 HZ','Asus','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/2023_12_18_638385135497691748_asus-zenbook-14-oled-ux3405ma-pp151w-ultra-5-125h-xanh-1.jpg','Laptop Asus Zenbook 14',21490000,60,'A1407CA-LY008WS',26,'Laptop văn phòng'),(9,'intel core ultra 5, RAM 16GB DDR5, SSD 512GB, 14\' IPS 60Hz','Asus','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/asus_vivobook_14_a1407_silver_1_c8553201b7.png','Laptop Asus Vivobook 14',19990000,283,'FA507NU-LP034W',117,'Laptop gaming'),(10,'AMD R7 7735HS, RAM 8GB DDR5, SSD 512GB, 15.6\' IPS FHD 144Hz, RTX 4050','Asus','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/2023_5_24_638205241498465719_asus-tuf-gaming-fa507nu-lp034w-r7-7735hs-xam-1.jpg','Laptop Asus TUF Gaming',44990000,50,'GU603VU-N4019W',24,'Laptop gaming'),(11,'Intel Core I7 13620H - Iris Xe, RAM 16GB DDR4, SSD 512GB, 16\' IPS 240Hz, RTX 4050','Acer','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/2024_5_4_638504121206886593_GU603VU-N4019W.jpg','Laptop Asus Gaming ROG Zephyrus G16',12290000,26,'A315-44P-R5QG',12,'Laptop văn phòng'),(12,'AMD R7 5700U, RAM 16GB DDR4, SSD 512GB, 16\' IPS FHD 60Hz','Acer','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/2022_3_7_637822560588852335_acer-aspire-3-a315-58-bac-1.jpg','Laptop Acer Aspire 3',18990000,226,'A715-76G-5806',135,'Laptop gaming'),(13,'Intel Core i5 12450H, RAM 16GB DDR4, SSD 512GB, 15.6\' IPS 144HZ, RTX 3050','Acer','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/2023_9_9_638298604983362410_acer-aspire-7-gaming-a715-76g-den-1.jpg','Laptop Acer Aspire 7 Gaming',18990000,352,'AN515-58-52SP',291,'Laptop gaming'),(14,'Intel Core i5 12500H , RAM 8GB DDR4, SSD 512GB, 15.6\' IPS 144Hz, RTX 3050','Acer','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/2022_3_1_637817435466475076_acer-nitro-gaming-an515-58-den-1.jpg','Laptop Acer Nitro 5 Tiger Gaming',15390000,192,'A515-58GM-53PZ',95,'Laptop gaming'),(15,'Inter Core i5 13420H, RAM 8GB DDR4, SSD 512GB, 15.6\' IPS 60HZ, RTX 2050','Acer','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/2024_2_23_638442806600262713_acer-gaming-aspire-5-a515-58-xam-4.jpg','Laptop Acer Gaming Aspire 5',17990000,88,'SFX16-51G-516Q',46,'Laptop văn phòng'),(16,'Intel core i5 11320H - Iris Xe, RAM 16GB LPDDR4X, SSD 512GB, 16\' IPS 60HZ, RTX 3050','Acer','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/2022_1_22_637784613352577988_acer-swift-x-sfx16-51g-xam-1.jpg','Laptop Acer Swift X',20990000,400,'AN515-58-5193',257,'Laptop gaming'),(17,'Intel Core i5 12450H, RAM 16GB DDR5, SSD 512GB, 15.6\' IPS 144HZ, RTX 4050','Acer','https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/acer_nitro_5_tiger_an515_58_2a10078adb.png','Laptop Acer Nitro 5 Tiger Gaming',15990000,52,'X1504ZA-NJ1039W',21,'Laptop văn phòng'),(18,'Apple M3, RAM 16GB, SSD 256GB, 13.6\' IPS 60Hz','Apple','https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/macbook_air_13_m3_midnight_1_368063bb53.png','MacBook Air 13',26090000,690,'M3 2024',448,'Macbook'),(19,'Apple M2, RAM 16GB, SSD 256GB, 13.6\' IPS 60Hz','Apple','https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/macbook_air_13_m2_space_gray_1_838001a645.png','MacBook Air 13',23490000,1100,'M2 2024',829,'Macbook'),(20,'Apple M3, RAM 16GB, SSD 512GB, 15.3\' IPS 60Hz','Apple','https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2024_3_18_638463800900006210_macbook-air-m3-15-2024-vang-1.jpg','Macbook Air 15',33990000,950,'M3 2024',742,'Macbook'),(21,'Apple M4, RAM 16GB, SSD 512GB, 14.2\' IPS 120Hz','Apple','https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/macbook_pro_14_m4_space_black_1_8891ba3512.png','MacBook Pro 14',39990000,1450,'M4 2024',1235,'Macbook'),(22,'Apple M4 Max, RAM 36GB, SSD 512GB, 14.2\' IPS 120Hz','Apple','https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/macbook_pro_14_m4_pro_max_silver_1_5f5be1163b.png','MacBook Pro 14',79990000,540,'M4 Max 2024',189,'Macbook');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-23 22:33:15
