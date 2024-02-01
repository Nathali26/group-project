DROP TABLE IF EXISTS users; 

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT, 
	username VARCHAR(255) NOT NULL, 
	password VARCHAR(255) NOT NULL, 
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS favourites_list;

CREATE TABLE favourites_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  departure DATETIME,
  arrival DATETIME,
  airline VARCHAR(255),
  rating FLOAT,
  provider VARCHAR(255),
  price VARCHAR(255),
  originalPrice VARCHAR(255),
  externalUrl TEXT
);

