

-- CREATE SCHEMA `sunset_vacation` ;

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `AddressID` int NOT NULL,
  `HouseNo` int DEFAULT NULL,
  `StreetNo` int DEFAULT NULL,
  `City` varchar(45) DEFAULT NULL,
  `ZipCode` int DEFAULT NULL,
  `Country` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`AddressID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `address` VALUES (2,16,2,'Khulna',1018,'Bangladesh');


--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CategoryID` int NOT NULL,
  `CategoryName` varchar(45) DEFAULT NULL,
  `SubCategoryName` varchar(45) DEFAULT NULL,
  `Description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Table structure for table `facilities`
--

DROP TABLE IF EXISTS `facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facilities` (
  `FacilityID` int NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`FacilityID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hosting`
--

CREATE TABLE `hosting` (
  `HostingID` int NOT NULL,
  `Title` varchar(100) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `MaxDaysRefund` int DEFAULT NULL,
  `HostingStartDate` datetime DEFAULT NULL,
  `Published` tinyint DEFAULT NULL,
  `OwnerID` int DEFAULT NULL,
  PRIMARY KEY (`HostingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `photo`
--

CREATE TABLE `photo` (
  `PhotoID` int NOT NULL,
  `LinkedID` int DEFAULT NULL,
  `PhotoLink` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`PhotoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `HostingID` int NOT NULL,
  `PerNightCost` int DEFAULT NULL,
  `EntirePrivateOrShared` varchar(20) DEFAULT NULL,
  `HighestGuestNo` int DEFAULT NULL,
  `Beds` int DEFAULT NULL,
  `Bedromms` int DEFAULT NULL,
  `Bathrooms` int DEFAULT NULL,
  `PrivateBathroomAvailable` tinyint DEFAULT NULL,
  `NeedHostConfirmation` tinyint DEFAULT '0',
  `PartialPayAllowed` tinyint DEFAULT NULL,
  `CategoryID` int NOT NULL,
  PRIMARY KEY (`HostingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

--
-- Table structure for table `propertyfacilities`
--

CREATE TABLE `propertyfacilities` (
  `PropertyID` int NOT NULL,
  `FacilityID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `special_deal`
--

CREATE TABLE `special_deal` (
  `SpecialDealID` int NOT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `Amount` int DEFAULT NULL,
  `Message` varchar(100) DEFAULT NULL,
  `HostingID` int NOT NULL,
  PRIMARY KEY (`SpecialDealID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int NOT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `PhoneNo` varchar(20) DEFAULT NULL,namenamename
  `Host` tinyint DEFAULT NULL,
  `Password` varchar(500) DEFAULT NULL,
  `AddressID` int DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

