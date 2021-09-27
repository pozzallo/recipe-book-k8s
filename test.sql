	"USE `recipe-book`;"
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
    );