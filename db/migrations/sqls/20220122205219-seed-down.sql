ALTER TABLE IF EXISTS "phone_numbers" DROP CONSTRAINT phone_numbers_user_id_user_user_id;
ALTER TABLE IF EXISTS "emails" DROP CONSTRAINT emails_user_id_user_user_id;

DROP TABLE IF EXISTS phone_numbers;
DROP TABLE IF EXISTS emails;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS session;