
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
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO", "admin"),
        ("courier1", "$2a$10$cn1SBeTylMQNR6vWSSdAlO4pSv2r2ObOpZngqxSt9tWgYurMZnQia", "courier"),
        ("courier2", "$2a$10$i2ejgx8v2y.taWzQA0/C/O1e5wEPsFbTwgPIzlbU3z2pDv2iUjPGq", "courier"),
        ("customer1", "$2a$10$X5T11GyRD5CeCg8YjYBvTO8U1bm.R8Dr.ocK21q/pJ91xqoUsJjuC", "customer"),
        ("customer2", "$2a$10$i2ejgx8v2y.taWzQA0/C/O1e5wEPsFbTwgPIzlbU3z2pDv2iUjPGq", "customer");

DROP TABLE IF EXISTS parcels;

-- Not the best or prettiest but it does the job
CREATE TABLE IF NOT EXISTS parcels (
    id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sender_address VARCHAR(255) NOT NULL,
    sender_address_details VARCHAR(255),
    sender_city VARCHAR(255),
    sender_postcode VARCHAR(25) NOT NULL,
    sender_country VARCHAR(255),
    recipient_address VARCHAR(255) NOT NULL,
    recipient_address_details VARCHAR(255),
    recipient_postcode VARCHAR(25) NOT NULL,
    recipient_city VARCHAR(255),
    recipient_country VARCHAR(255),
    weight_kg INT(5),
    sender_username VARCHAR(255),
    recipient_name VARCHAR(255),
    courier_name VARCHAR(255),
    date_time_created DATETIME,
    date_time_in_transit DATETIME,
    date_time_delivered DATETIME,
    status VARCHAR(45) DEFAULT 'not-dispatched', 
    uuid VARCHAR(255) NOT NULL,
    handed_to_name VARCHAR(255),
    handed_to_signature TEXT
    -- acc_lat DECIMAL(11,7),
    -- acc_lng DECIMAL(11,7)
);

-- For testing
INSERT INTO parcels(
                    sender_address, 
                    sender_city, 
                    sender_postcode, 
                    sender_country, 
                    recipient_address, 
                    recipient_city, 
                    recipient_postcode, 
                    recipient_country, 
                    weight_kg, 
                    sender_username, 
                    recipient_name, 
                    courier_name,
                    date_time_created, 
                    date_time_in_transit, 
                    date_time_delivered, 
                    status, 
                    uuid
                  )         
          VALUES( "68 S Audley St", 
                  "London", 
                  "W1K 2QY",  
                  "United Kingdom", 
                  "534 Fulham Palace Rd", 
                  "London", 
                  "SW6 6JH", 
                  "United Kingdom",
                  "10", 
                  "customer1", 
                  "John Doe", 
                  null, 
                  "2022-06-06 00:51:51", 
                  null, 
                  null, 
                  "not-dispatched", 
                  UUID()
                ),
                ( "4 Water St", 
                  "Liverpool", 
                  "L2 3SP",  
                  "United Kingdom", 
                  "8-14 Talbot Square, Tyburnia", 
                  "London", "W2 1TS", 
                  "United Kingdom",
                  "20", 
                  "customer1", 
                  "Mark Spencer", 
                  null, 
                  "2022-06-06 00:51:51", 
                  null, 
                  null, 
                  "not-dispatched", 
                  UUID()
                ),        
                ( "Derrys Cross", 
                  "Plymouth", 
                  "PL1 2SN",  
                  "United Kingdom", 
                  "Station Rise", 
                  "York", 
                  "YO1 6GD", 
                  "United Kingdom",
                  "10", 
                  "customer1", 
                  "John Doe", 
                  null, 
                  "2022-06-06 00:51:51", 
                  null, 
                  null, 
                  "not-dispatched", 
                  UUID()
                ),
                ( "Brook St", 
                  "Cromer", 
                  "NR27 9HD",  
                  "United Kingdom", 
                  "6 Northcote Rd", 
                  "London", 
                  "SW11 1NT", 
                  "United Kingdom",
                  "10", 
                  "customer1", 
                  "John Doe", 
                  null,
                  "2022-06-06 00:51:51", 
                  null, 
                  null, 
                  "not-dispatched", 
                  UUID()
                ),
                ( "128 High St", 
                  "Slough", "SL1 1JF",  
                  "United Kingdom", 
                  "442-444 Roman Rd", 
                  "Bow, London", 
                  "E3 5LU", 
                  "United Kingdom",
                  "10", 
                  "customer1", 
                  "John Doe", 
                  "courier1", 
                  "2022-06-06 00:51:51", 
                  "2022-06-06 00:51:51", 
                  null,
                  "in-transit", 
                  UUID()
                );
        


