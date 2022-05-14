
-- make sure the websiteuser account is set up and has the correct privileges
CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;

DROP TABLE IF EXISTS accounts;

CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(70) NOT NULL
);

INSERT INTO accounts(user, pass)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO");


DROP TABLE IF EXISTS parcels;

CREATE TABLE IF NOT EXISTS parcels (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sender_postcode VARCHAR(25) NOT NULL,
  recipient_postcode VARCHAR(25) NOT NULL,
  weight_kg INT(5),
  recipient_name VARCHAR(255),
  full_address VARCHAR(512),
  sender_username VARCHAR(255),
  date_time TIMESTAMP,
  uuid VARCHAR(255) NOT NULL,
  status VARCHAR(45) DEFAULT 'not-dispatched'
);

#For testing
INSERT INTO parcels(sender_postcode, recipient_postcode,
                    weight_kg, recipient_name, full_address,
                    sender_username, uuid)

	VALUES("CV1 1JU", "CV1 5FB", 10, "John Doe", "Priory St, Coventry CV1 5FB", "doej", UUID());



-- DROP TABLE IF EXISTS record;

-- CREATE TABLE IF NOT EXISTS record (
--   id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--   sender_postcode VARCHAR(25) NOT NULL,
--   recipient_postcode VARCHAR(25) NOT NULL,
--   weight_kg INT(5),
--   recipient_name VARCHAR(255),
--   full_address VARCHAR(512),
--   sender_username VARCHAR(255),
--   date_time TIMESTAMP,
--   uuid VARCHAR(255) NOT NULL
-- );








