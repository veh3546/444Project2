-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: library
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `author` text NOT NULL,
  `description` text,
  `genre` text,
  `year_published` int DEFAULT NULL,
  `publisher` text,
  `is_loaned` int DEFAULT '0',
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'The Hobbit','J.R.R. Tolkien','A hobbit goes on an adventure','Fantasy',1937,'Allen & Unwin',1),(2,'Brave New World','Aldous Huxley','A dystopian future society','Science Fiction',1932,'Chatto & Windus',1),(3,'The Catcher in the Rye','J.D. Salinger','A teenage boy in New York','Fiction',1951,'Little Brown',0),(4,'The Alchemist','Paulo Coelho','A journey of self-discovery','Fiction',1988,'HarperOne',1),(5,'Fahrenheit 451','Ray Bradbury','A future where books are burned','Science Fiction',1953,'Ballantine Books',0),(6,'The Da Vinci Code','Dan Brown','A mystery thriller','Thriller',2003,'Doubleday',1),(7,'Gone Girl','Gillian Flynn','A psychological thriller','Thriller',2012,'Crown Publishing',0),(8,'The Road','Cormac McCarthy','A post-apocalyptic journey','Fiction',2006,'Knopf',1),(9,'The Hunger Games','Suzanne Collins','A dystopian survival competition','Science Fiction',2008,'Scholastic',0),(10,'The Shining','Stephen King','A family trapped in a haunted hotel','Horror',1977,'Doubleday',1),(11,'Pride and Prejudice','Jane Austen','A romantic novel of manners','Romance',1813,'T. Egerton',0),(12,'The Count of Monte Cristo','Alexandre Dumas','A tale of revenge and justice','Adventure',1844,'Chapman and Hall',1),(13,'Sherlock Holmes','Arthur Conan Doyle','The adventures of a famous detective','Mystery',1892,'George Newnes',0),(14,'Animal Farm','George Orwell','A political allegory about a farm','Fiction',1945,'Secker & Warburg',0),(15,'The Godfather','Mario Puzo','A powerful mafia family story','Thriller',1969,'Putnam',1),(16,'Dracula','Bram Stoker','The story of the famous vampire','Horror',1897,'Archibald Constable',0),(17,'The Hobbit','J.R.R. Tolkien','A hobbit goes on an adventure','Fantasy',1937,'Allen & Unwin',1),(18,'Brave New World','Aldous Huxley','A dystopian future society','Science Fiction',1932,'Chatto & Windus',0),(19,'The Catcher in the Rye','J.D. Salinger','A teenage boy in New York','Fiction',1951,'Little Brown',0),(20,'The Alchemist','Paulo Coelho','A journey of self-discovery','Fiction',1988,'HarperOne',1),(21,'Fahrenheit 451','Ray Bradbury','A future where books are burned','Science Fiction',1953,'Ballantine Books',0),(22,'The Da Vinci Code','Dan Brown','A mystery thriller','Thriller',2003,'Doubleday',1),(23,'Gone Girl','Gillian Flynn','A psychological thriller','Thriller',2012,'Crown Publishing',0),(24,'The Road','Cormac McCarthy','A post-apocalyptic journey','Fiction',2006,'Knopf',1),(25,'The Hunger Games','Suzanne Collins','A dystopian survival competition','Science Fiction',2008,'Scholastic',0),(26,'The Shining','Stephen King','A family trapped in a haunted hotel','Horror',1977,'Doubleday',1),(27,'Pride and Prejudice','Jane Austen','A romantic novel of manners','Romance',1813,'T. Egerton',0),(28,'The Count of Monte Cristo','Alexandre Dumas','A tale of revenge and justice','Adventure',1844,'Chapman and Hall',1),(29,'Sherlock Holmes','Arthur Conan Doyle','The adventures of a famous detective','Mystery',1892,'George Newnes',0),(30,'Animal Farm','George Orwell','A political allegory about a farm','Fiction',1945,'Secker & Warburg',0),(31,'The Godfather','Mario Puzo','A powerful mafia family story','Thriller',1969,'Putnam',1),(32,'Dracula','Bram Stoker','The story of the famous vampire','Horror',1897,'Archibald Constable',0),(33,'The Hobbit','J.R.R. Tolkien','A hobbit goes on an adventure','Fantasy',1937,'Allen & Unwin',1),(34,'Brave New World','Aldous Huxley','A dystopian future society','Science Fiction',1932,'Chatto & Windus',0),(35,'The Catcher in the Rye','J.D. Salinger','A teenage boy in New York','Fiction',1951,'Little Brown',0),(36,'The Alchemist','Paulo Coelho','A journey of self-discovery','Fiction',1988,'HarperOne',1),(37,'Fahrenheit 451','Ray Bradbury','A future where books are burned','Science Fiction',1953,'Ballantine Books',0),(38,'The Da Vinci Code','Dan Brown','A mystery thriller','Thriller',2003,'Doubleday',1),(39,'Gone Girl','Gillian Flynn','A psychological thriller','Thriller',2012,'Crown Publishing',0),(40,'The Road','Cormac McCarthy','A post-apocalyptic journey','Fiction',2006,'Knopf',1),(41,'The Hunger Games','Suzanne Collins','A dystopian survival competition','Science Fiction',2008,'Scholastic',0),(42,'The Shining','Stephen King','A family trapped in a haunted hotel','Horror',1977,'Doubleday',1),(43,'Pride and Prejudice','Jane Austen','A romantic novel of manners','Romance',1813,'T. Egerton',0),(44,'The Count of Monte Cristo','Alexandre Dumas','A tale of revenge and justice','Adventure',1844,'Chapman and Hall',1),(45,'Sherlock Holmes','Arthur Conan Doyle','The adventures of a famous detective','Mystery',1892,'George Newnes',0),(46,'Animal Farm','George Orwell','A political allegory about a farm','Fiction',1945,'Secker & Warburg',0),(47,'The Godfather','Mario Puzo','A powerful mafia family story','Thriller',1969,'Putnam',1),(48,'Dracula','Bram Stoker','The story of the famous vampire','Horror',1897,'Archibald Constable',0),(49,'The Hobbit','J.R.R. Tolkien','A hobbit goes on an adventure','Fantasy',1937,'Allen & Unwin',1),(50,'Brave New World','Aldous Huxley','A dystopian future society','Science Fiction',1932,'Chatto & Windus',0),(51,'The Catcher in the Rye','J.D. Salinger','A teenage boy in New York','Fiction',1951,'Little Brown',0),(52,'The Alchemist','Paulo Coelho','A journey of self-discovery','Fiction',1988,'HarperOne',1),(53,'Fahrenheit 451','Ray Bradbury','A future where books are burned','Science Fiction',1953,'Ballantine Books',0),(54,'The Da Vinci Code','Dan Brown','A mystery thriller','Thriller',2003,'Doubleday',1),(55,'Gone Girl','Gillian Flynn','A psychological thriller','Thriller',2012,'Crown Publishing',0),(56,'The Road','Cormac McCarthy','A post-apocalyptic journey','Fiction',2006,'Knopf',1),(57,'The Hunger Games','Suzanne Collins','A dystopian survival competition','Science Fiction',2008,'Scholastic',0),(58,'The Shining','Stephen King','A family trapped in a haunted hotel','Horror',1977,'Doubleday',1),(59,'Pride and Prejudice','Jane Austen','A romantic novel of manners','Romance',1813,'T. Egerton',0),(60,'The Count of Monte Cristo','Alexandre Dumas','A tale of revenge and justice','Adventure',1844,'Chapman and Hall',1),(61,'Sherlock Holmes','Arthur Conan Doyle','The adventures of a famous detective','Mystery',1892,'George Newnes',0),(62,'Animal Farm','George Orwell','A political allegory about a farm','Fiction',1945,'Secker & Warburg',0),(63,'The Godfather','Mario Puzo','A powerful mafia family story','Thriller',1969,'Putnam',1),(64,'Dracula','Bram Stoker','The story of the famous vampire','Horror',1897,'Archibald Constable',0),(65,'The Hobbit','J.R.R. Tolkien','A hobbit goes on an adventure','Fantasy',1937,'Allen & Unwin',1),(66,'Brave New World','Aldous Huxley','A dystopian future society','Science Fiction',1932,'Chatto & Windus',0),(67,'The Catcher in the Rye','J.D. Salinger','A teenage boy in New York','Fiction',1951,'Little Brown',0),(68,'The Alchemist','Paulo Coelho','A journey of self-discovery','Fiction',1988,'HarperOne',1),(69,'Fahrenheit 451','Ray Bradbury','A future where books are burned','Science Fiction',1953,'Ballantine Books',0),(70,'The Da Vinci Code','Dan Brown','A mystery thriller','Thriller',2003,'Doubleday',1),(71,'Gone Girl','Gillian Flynn','A psychological thriller','Thriller',2012,'Crown Publishing',0),(72,'The Road','Cormac McCarthy','A post-apocalyptic journey','Fiction',2006,'Knopf',1),(73,'The Hunger Games','Suzanne Collins','A dystopian survival competition','Science Fiction',2008,'Scholastic',0),(74,'The Shining','Stephen King','A family trapped in a haunted hotel','Horror',1977,'Doubleday',1),(75,'Pride and Prejudice','Jane Austen','A romantic novel of manners','Romance',1813,'T. Egerton',0),(76,'The Count of Monte Cristo','Alexandre Dumas','A tale of revenge and justice','Adventure',1844,'Chapman and Hall',1),(77,'Sherlock Holmes','Arthur Conan Doyle','The adventures of a famous detective','Mystery',1892,'George Newnes',0),(78,'Animal Farm','George Orwell','A political allegory about a farm','Fiction',1945,'Secker & Warburg',0),(79,'The Godfather','Mario Puzo','A powerful mafia family story','Thriller',1969,'Putnam',1),(80,'Dracula','Bram Stoker','The story of the famous vampire','Horror',1897,'Archibald Constable',0);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `loan_id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `user_id` int NOT NULL,
  `loan_date` varchar(20) DEFAULT (curdate()),
  `due_date` text NOT NULL,
  `return_date` text,
  `status` varchar(20) DEFAULT 'active',
  PRIMARY KEY (`loan_id`),
  KEY `book_id` (`book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `loan_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `loan_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES (1,1,1,'2026-05-03','2026-05-12',NULL,'active'),(2,8,1,'2024-01-12','2024-01-27',NULL,'returned'),(3,9,3,'2026-01-15','2026-01-30',NULL,'active'),(4,11,2,'2026-01-18','2026-02-02',NULL,'active'),(5,13,1,'2026-01-20','2026-02-04',NULL,'returned'),(6,3,1,'2026-05-01','2026-05-15',NULL,'active'),(7,5,2,'2026-04-20','2026-05-05',NULL,'returned'),(8,7,3,'2026-05-02','2026-05-16',NULL,'active'),(9,10,1,'2026-04-15','2026-04-30',NULL,'returned'),(10,12,2,'2026-05-03','2026-05-17',NULL,'active'),(13,2,1,'2026-05-04','2026-06-03',NULL,'active');
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password_hash` text NOT NULL,
  `email` text NOT NULL,
  `full_name` text,
  `role` varchar(20) DEFAULT 'member',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'user','121771','test@test.com','First Last','member','2026-05-04 01:13:21'),(2,'test2','121771','test@test.com','First Last','member','2026-05-04 01:18:02'),(3,'test3','121771','test@test.com','First Last','member','2026-05-04 01:18:16');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-04 12:41:52
