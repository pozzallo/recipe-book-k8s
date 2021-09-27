CREATE DATABASE  IF NOT EXISTS `recipe-book`;
USE `recipe-book`;

DROP TABLE IF EXISTS `authorities`;

CREATE TABLE `authorities` (
  `user_id` int NOT NULL,
  `authority` int NOT NULL,
  PRIMARY KEY (`user_id`,`authority`),
  KEY `authority` (`authority`),
  CONSTRAINT `authorities_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `authorities_ibfk_2` FOREIGN KEY (`authority`) REFERENCES `authority` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `authorities` WRITE;
INSERT INTO `authorities` VALUES (1,1),(2,1),(2,2);
UNLOCK TABLES;

DROP TABLE IF EXISTS `authority`;
CREATE TABLE `authority` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `authority` WRITE;
INSERT INTO `authority` VALUES (1,'ROLE_USER'),(2,'ROLE_ADMIN');
UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `enabled` tinyint NOT NULL DEFAULT '1',
  `google_sub` varchar(256) DEFAULT NULL,
  `facebook_id` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'user','user@email.com','$2a$10$vsGpW3iaytUTW8h/CwZF5OjQQQ1NfuY4xuSDFsAf5GgkVYqJ/nD4O',1,NULL,NULL),
(2,'admin','super_admin@gmail.com','$2a$10$AsOqxa0pKqOP3g5LvppuEOT0zpyVkxCqhhmdBUhPt6lH1yVG50y1W',1,NULL,NULL);
UNLOCK TABLES;

DROP TABLE IF EXISTS `ingredients`;
CREATE TABLE `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `recipe_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ingredients_ibfk_1` (`recipe_id`),
  CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=278 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `ingredients` WRITE;
INSERT INTO `ingredients` VALUES (1,'shugar',20,2),
(2,'nuts',12,2),
(3,'tomatoes',15,1),
(4,'cheese',12,3),
(5,'coffee',1,4),
(6,'milk',10,5),
(7,'cinamon',10,4),
(8,'meat',100,1),
(9,'eggs',10,5),
(10,'milk',4,4),
(11,'shugar',20,4),
(12,'tomatoes',15,3);
UNLOCK TABLES;

DROP TABLE IF EXISTS `recipes`;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `image_url` varchar(512) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `is_pending_to_approve` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `recipes_ibfk_1_idx` (`user_id`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `recipes` WRITE;
INSERT INTO `recipes` VALUES (1,'Barbeque','Tasty Barbeque','https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',NULL,0),
(2,'Cookie','Light cookie','https://media.istockphoto.com/photos/masala-vada-spicy-fried-fritters-picture-id1169098788',NULL,0),
(3,'Pizza','...mmmm','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:1.00xh;0,0&resize=980:*',NULL,0),
(4,'Cappuccino','Light fragrant coffee','https://media3.s-nbcnews.com/j/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p_67dfb6820f7d3898b5486975903c2e51.fit-1240w.jpg',NULL,0),
(5,'Omelet','Very easy to prepare','https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/cheeseomelette_80621_16x9.jpg',NULL,0);
UNLOCK TABLES;

DROP TABLE IF EXISTS `shopping_list_item`;
CREATE TABLE `shopping_list_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `recipe_name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=298 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
