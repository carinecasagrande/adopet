CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(256) COLLATE utf8_bin NOT NULL,
    `name` varchar(100) COLLATE utf8_bin NOT NULL,
    `password` varchar(226) COLLATE utf8_bin NOT NULL,
    `image` blob DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `pets` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) COLLATE utf8_bin NOT NULL,
    `years` varchar(45) COLLATE utf8_bin NOT NULL,
    `description` varchar(100) COLLATE utf8_bin NOT NULL,
    `city` varchar(100) COLLATE utf8_bin NOT NULL,
    `image` blob NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `contact` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) COLLATE utf8_bin NOT NULL,
    `phone` varchar(14) COLLATE utf8_bin NOT NULL,
    `pet` varchar(100) COLLATE utf8_bin NOT NULL,
    `message` text COLLATE utf8_bin NOT NULL,
    `created` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
