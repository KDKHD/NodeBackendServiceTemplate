ALTER TABLE "phone_numbers" DROP FOREIGN KEY phone_numbers_user_id_user_user_id;
ALTER TABLE "emails" DROP FOREIGN KEY emails_user_id_user_user_id;

DROP TABLE IF EXISTS phone_numbers
DROP TABLE IF EXISTS emails
DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS session