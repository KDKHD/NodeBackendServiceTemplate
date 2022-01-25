CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");


CREATE TABLE IF NOT EXISTS "users" (
  "user_id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "password_hash" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS "emails" (
  "email_id" SERIAL PRIMARY KEY,
  "user_id" int NOT NULL,
  "email" varchar NOT NULL,
  "verified" boolean DEFAULT false,
  "primary" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS "phone_numbers" (
  "phone_number_id" SERIAL PRIMARY KEY,
  "user_id" int NOT NULL,
  "phone_number" varchar NOT NULL,
  "verified" boolean DEFAULT false,
  "primary" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

ALTER TABLE "emails" ADD CONSTRAINT emails_user_id_user_user_id FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "phone_numbers" ADD CONSTRAINT phone_numbers_user_id_user_user_id FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

