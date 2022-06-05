
-- make sure the websiteuser account is set up and has the correct privileges
CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;

DROP TABLE IF EXISTS accounts;

CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(70) NOT NULL,
  role VARCHAR(25) DEFAULT 'customer'
);

INSERT INTO accounts(user, pass, role)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO", "admin");

INSERT INTO accounts(user, pass, role)
	VALUES("courier1", "$2a$10$cn1SBeTylMQNR6vWSSdAlO4pSv2r2ObOpZngqxSt9tWgYurMZnQia", "courier");

INSERT INTO accounts(user, pass, role)
	VALUES("courier2", "$2a$10$i2ejgx8v2y.taWzQA0/C/O1e5wEPsFbTwgPIzlbU3z2pDv2iUjPGq", "courier");

INSERT INTO accounts(user, pass, role)
	VALUES("customer1", "$2a$10$X5T11GyRD5CeCg8YjYBvTO8U1bm.R8Dr.ocK21q/pJ91xqoUsJjuC", "customer");

INSERT INTO accounts(user, pass, role)
	VALUES("customer2", "$2a$10$i2ejgx8v2y.taWzQA0/C/O1e5wEPsFbTwgPIzlbU3z2pDv2iUjPGq", "customer");


DROP TABLE IF EXISTS parcels;

CREATE TABLE IF NOT EXISTS parcels (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sender_postcode VARCHAR(25) NOT NULL,
  recipient_postcode VARCHAR(25) NOT NULL,
  weight_kg INT(5),
  recipient_name VARCHAR(255),
  full_address VARCHAR(512),
  sender_username VARCHAR(255),
  date_time_created DATETIME,
  date_time_in_transit DATETIME,
  date_time_delivered DATETIME,
  uuid VARCHAR(255) NOT NULL,
  status VARCHAR(45) DEFAULT 'not-dispatched',
  -- Change Later
  courier_name VARCHAR(255),
  recip_name VARCHAR(255),
  recip_signature VARCHAR(255),
  coordinate_x DECIMAL(11,7),
  coordinate_y DECIMAL(11,7)  
);


-- For testing
INSERT INTO parcels(sender_postcode, recipient_postcode,
                    weight_kg, recipient_name, full_address,
                    sender_username, date_time_created, uuid)
                                                                                      -- Or use the UUID() function
	VALUES("CV1 1JU", "CV1 5FB", 10, "John Doe", "Priory St, Coventry CV1 5FB", "customer1", "2022-06-05 03:43:51", "4fe2dd30-d325-11ec-b8eb-a21261897db1");








