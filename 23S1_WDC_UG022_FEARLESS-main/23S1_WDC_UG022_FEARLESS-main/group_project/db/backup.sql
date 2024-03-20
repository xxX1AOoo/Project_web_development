-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: FEARLESS
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

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
-- Current Database: `FEARLESS`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `FEARLESS` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `FEARLESS`;

--
-- Table structure for table `Clubs`
--

DROP TABLE IF EXISTS `Clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clubs` (
  `club_id` int NOT NULL AUTO_INCREMENT,
  `club_name` varchar(255) NOT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `intro` text,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`club_id`),
  UNIQUE KEY `club_name` (`club_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clubs`
--

LOCK TABLES `Clubs` WRITE;
/*!40000 ALTER TABLE `Clubs` DISABLE KEYS */;
INSERT INTO `Clubs` VALUES (1,'Fitness Club','images/fitness_club3.jpg','Welcome to the Fitness Club, where we believe that a healthy body leads to a healthy mind!\n    Our club is a vibrant and inclusive community dedicated to promoting fitness, wellness, and overall well-being among students.\n    With a wide range of activities and programs tailored specifically for students, we aim to create a supportive and energetic environment\n    that fosters physical fitness, mental resilience, and personal growth. Whether you\'re a beginner or an experienced fitness enthusiast,\n    our expert trainers and passionate members will inspire and motivate you on your journey towards a stronger, happier, and more confident you.\n    Join us today and embrace a lifestyle that prioritizes your health and success!','3354807369@qq.com'),(2,'Game Club','images/gameclub.jpeg','Welcome to our game club!','GameClub@example.com'),(4,'flower','http://localhost:8080/images/uploads/file-1686309146654.jpeg','HI','fff@example.com');
/*!40000 ALTER TABLE `Clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) DEFAULT NULL,
  `event_content` text,
  `time` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `club_id` int NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `Events_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `Clubs` (`club_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (1,'Get Your Fitness on Track','Looking to kickstart your fitness journey?\nOur expert trainers will provide you with a personalized fitness assessment, including body composition, cardiovascular fitness, strength, and flexibility.\nThey will then work with you to create a customized workout plan that fits your goals, schedule, and abilities.\nYou\'ll also receive expert advice on nutrition and lifestyle habits to support your fitness journey.\nDon\'t wait to get on track towards a healthier, happier you - sign up for our event today!','3PM, Sunday, 02 July 2023','Fitness Center',1),(2,'2','some event details','3PM, Friday, 30 June 2023','Fitness Center',1),(3,'Game event','some event details','7PM, Friday, 30 June 2023','Game Center',2),(4,'aaa','event','08/07/2023','here',1),(5,'new e','eee','08/07/2023','here',1),(6,'event aaa','aaa','08/07/2023','here',1);
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Members`
--

DROP TABLE IF EXISTS `Members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Members` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `is_manager` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int NOT NULL,
  `club_id` int NOT NULL,
  PRIMARY KEY (`member_id`),
  KEY `user_id` (`user_id`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `Members_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `Members_ibfk_2` FOREIGN KEY (`club_id`) REFERENCES `Clubs` (`club_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Members`
--

LOCK TABLES `Members` WRITE;
/*!40000 ALTER TABLE `Members` DISABLE KEYS */;
INSERT INTO `Members` VALUES (1,0,1,1),(2,1,2,1);
/*!40000 ALTER TABLE `Members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_title` varchar(255) DEFAULT NULL,
  `post_content` text,
  `is_public` tinyint(1) NOT NULL DEFAULT '1',
  `created` datetime DEFAULT NULL,
  `author` int DEFAULT NULL,
  `club_id` int NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `author` (`author`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `Posts_ibfk_1` FOREIGN KEY (`author`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `Posts_ibfk_2` FOREIGN KEY (`club_id`) REFERENCES `Clubs` (`club_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (1,'Public 1','Welcome to Fitness Club!',1,'2023-06-09 05:16:26',NULL,1),(2,'member-only 1','some contents',0,'2023-06-09 05:16:26',NULL,1),(3,'game puclic 1','some contents',1,'2023-06-09 10:11:45',NULL,2),(4,'public 2','aaa',1,'2023-06-09 10:25:26',2,1),(5,'member-only aaa','aaa',0,'2023-06-09 10:25:45',2,1),(6,'public 3','333',1,'2023-06-09 10:58:51',2,1),(7,'aaa','member',0,'2023-06-09 10:59:04',2,1),(8,'public x','xxx',1,'2023-06-09 11:10:10',2,1),(9,'private','aaa',0,'2023-06-09 11:10:25',2,1);
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RSVP`
--

DROP TABLE IF EXISTS `RSVP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RSVP` (
  `RSVP_id` int NOT NULL AUTO_INCREMENT,
  `is_attending` tinyint(1) NOT NULL DEFAULT '0',
  `event_id` int NOT NULL,
  `club_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`RSVP_id`),
  KEY `event_id` (`event_id`),
  KEY `club_id` (`club_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `RSVP_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Events` (`event_id`) ON DELETE CASCADE,
  CONSTRAINT `RSVP_ibfk_2` FOREIGN KEY (`club_id`) REFERENCES `Clubs` (`club_id`) ON DELETE CASCADE,
  CONSTRAINT `RSVP_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RSVP`
--

LOCK TABLES `RSVP` WRITE;
/*!40000 ALTER TABLE `RSVP` DISABLE KEYS */;
INSERT INTO `RSVP` VALUES (1,1,1,1,1);
/*!40000 ALTER TABLE `RSVP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT 'images/cat_profile.jpeg',
  `email` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'admin','$argon2id$v=19$m=65536,t=3,p=4$/DeBe7LoVv5UkoEkydKpCA$n/WA8/X6x0VLHwWw82JhV8dllNoKS58/kn+NZp64feM','admin','name','images/uploads/d1f08778e82b86b62e8b341a8ace5a3f','aaa@example.com',1),(2,'manager','$argon2id$v=19$m=65536,t=3,p=4$5pTmDaWpNK1mMllg5vLL+Q$uWZlo46A2vyXtc+JqnlmohveasNOOefNfh13woFRwv4','manager','name','images/uploads/6b108e4c37c6f2544db01947112f029c','mmm@example.com',1);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-09 12:57:09
