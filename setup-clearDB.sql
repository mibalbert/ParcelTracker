-- MySQL dump 10.13  Distrib 5.7.37, for Linux (x86_64)
--
-- Host: localhost    Database: website
-- ------------------------------------------------------
-- Server version	5.7.37-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(25) NOT NULL,
  `pass` varchar(70) NOT NULL,
  `role` varchar(25) DEFAULT 'customer',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'doej','$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO','admin'),(2,'courier1','$2a$10$cn1SBeTylMQNR6vWSSdAlO4pSv2r2ObOpZngqxSt9tWgYurMZnQia','courier'),(3,'courier2','$2a$10$i2ejgx8v2y.taWzQA0/C/O1e5wEPsFbTwgPIzlbU3z2pDv2iUjPGq','courier'),(4,'customer1','$2a$10$X5T11GyRD5CeCg8YjYBvTO8U1bm.R8Dr.ocK21q/pJ91xqoUsJjuC','customer'),(5,'customer2','$2a$10$i2ejgx8v2y.taWzQA0/C/O1e5wEPsFbTwgPIzlbU3z2pDv2iUjPGq','customer');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parcels`
--

DROP TABLE IF EXISTS `parcels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parcels` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `sender_address` varchar(255) NOT NULL,
  `sender_address_details` varchar(255) DEFAULT NULL,
  `sender_city` varchar(255) DEFAULT NULL,
  `sender_postcode` varchar(25) NOT NULL,
  `sender_country` varchar(255) DEFAULT NULL,
  `recipient_address` varchar(255) NOT NULL,
  `recipient_address_details` varchar(255) DEFAULT NULL,
  `recipient_postcode` varchar(25) NOT NULL,
  `recipient_city` varchar(255) DEFAULT NULL,
  `recipient_country` varchar(255) DEFAULT NULL,
  `weight_kg` int(5) DEFAULT NULL,
  `sender_username` varchar(255) DEFAULT NULL,
  `recipient_name` varchar(255) DEFAULT NULL,
  `courier_name` varchar(255) DEFAULT NULL,
  `date_time_created` datetime DEFAULT NULL,
  `date_time_in_transit` datetime DEFAULT NULL,
  `date_time_delivered` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT 'not-dispatched',
  `uuid` varchar(255) NOT NULL,
  `handed_to_name` varchar(255) DEFAULT NULL,
  `handed_to_signature` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parcels`
--

LOCK TABLES `parcels` WRITE;
/*!40000 ALTER TABLE `parcels` DISABLE KEYS */;
INSERT INTO `parcels` VALUES (1,'68 S Audley St',NULL,'London','W1K 2QY','United Kingdom','534 Fulham Palace Rd',NULL,'SW6 6JH','London','United Kingdom',10,'customer1','John Doe','courier1','2022-06-06 00:51:51','2022-07-02 17:10:29',NULL,'in-transit','057ddd3b-fa2a-11ec-9b60-923dd56089f8',NULL,NULL),(2,'4 Water St',NULL,'Liverpool','L2 3SP','United Kingdom','8-14 Talbot Square, Tyburnia',NULL,'W2 1TS','London','United Kingdom',20,'customer1','Mark Spencer',NULL,'2022-06-06 00:51:51',NULL,NULL,'not-dispatched','057dde36-fa2a-11ec-9b60-923dd56089f8',NULL,NULL),(3,'Derrys Cross',NULL,'Plymouth','PL1 2SN','United Kingdom','Station Rise',NULL,'YO1 6GD','York','United Kingdom',10,'customer1','John Doe',NULL,'2022-06-06 00:51:51',NULL,NULL,'not-dispatched','057ddf07-fa2a-11ec-9b60-923dd56089f8',NULL,NULL),(4,'Brook St',NULL,'Cromer','NR27 9HD','United Kingdom','6 Northcote Rd',NULL,'SW11 1NT','London','United Kingdom',10,'customer1','John Doe','courier1','2022-06-06 00:51:51','2022-07-02 17:10:29',NULL,'in-transit','057ddf65-fa2a-11ec-9b60-923dd56089f8',NULL,NULL),(5,'128 High St',NULL,'Slough','SL1 1JF','United Kingdom','442-444 Roman Rd',NULL,'E3 5LU','Bow, London','United Kingdom',10,'customer1','John Doe','courier1','2022-06-06 00:51:51','2022-06-06 00:51:51',NULL,'in-transit','057ddfc1-fa2a-11ec-9b60-923dd56089f8',NULL,NULL);
/*!40000 ALTER TABLE `parcels` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-02 17:35:26
