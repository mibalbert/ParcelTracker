
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
  snd_lat DECIMAL(11,7),
  snd_lng DECIMAL(11,7),
  rcv_lat DECIMAL(11,7),
  rcv_lng DECIMAL(11,7),
  acc_lat DECIMAL(11,7),
  acc_lng DECIMAL(11,7)
);

  -- snd_lat DECIMAL(11,7),  --sender's postcode in latitude 
  -- snd_lng DECIMAL(11,7),  --and longitude
  -- rcv_lat DECIMAL(11,7),  --recipient's/receiver's postcode in latitude
  -- rcv_lng DECIMAL(11,7),  --and longitude
  -- acc_lat DECIMAL(11,7),  --actual latitude and
  -- acc_lng DECIMAL(11,7)   --longitude of the parcel when status changed to 'delivered'


-- For testing
INSERT INTO parcels(sender_postcode, recipient_postcode,
                    weight_kg, recipient_name, full_address,
                    sender_username, date_time_created, date_time_in_transit, date_time_delivered, snd_lat, snd_lng, rcv_lat, rcv_lng, uuid)
                                             
	VALUES("W1J 7TD", "WC1B 3DG", 10, "John Doe", "Great Russell St, London, WC1B 3DG", "customer1", "2022-06-06 00:51:51", null, null, 51.508575,-0.139395, 51.513941, -0.100463, UUID()),
        ("SW1A 2AA", "WC1B 3DG", 20, "Johny Doing", "Great Russell St, London, WC1B 3DG", "customer1", "2022-06-06 01:51:51", null, null, null,null,null,null, UUID()),
        ("W1J 7TD", "SW1A 2AA", 20, "Johny Dogs", "10 Downing St, London, SW1A 2AA", "customer1", "2022-06-05 01:51:51", null, null, null,null,null,null, UUID()),
        ("EC1R 4RR", "W1S 1RQ", 20, "Luthor James", "63 New Bond St", "customer2", "2022-06-05 01:51:51", null, null, null,null,null,null, UUID()),
        ("E1 1DU", "SW1V 4EQ", 11, "Mark Spencer", "Cambridge St, Pimlico, London SW1V 4EQ", "customer2", "2022-06-04 05:51:51", null, null, null,null,null,null, UUID()),
        ("W1U 2RQ", "SE1 8SS", 15, "John Ventura", "75 Roupell St, London SE1 8SS", "customer2", "2022-06-03 10:51:51", null, null, null,null,null,null, UUID());


-- 1.   S Audley St, London , W1J 7TD, 51.506794, -0.1505902
-- 2.   Great Russell St, London, WC1B 3DG, 51.519362,-0.126873
-- 3.   10 Downing St, London, SW1A 2AA, 51.50354, -0.127695
-- 4.   70 Rosebery Ave, London EC1R 4RR
-- 5.   63 New Bond St, London W1S 1RQ
-- 6.   Office 410, 7 Whitechapel Rd, London E1 1DU
-- 7.   Cambridge St, Pimlico, London SW1V 4EQ
-- 8.   20 Wigmore St, London W1U 2RQ
-- 9.   75 Roupell St, London SE1 8SS
