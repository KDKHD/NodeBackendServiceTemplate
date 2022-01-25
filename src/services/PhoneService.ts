import pool from "@db";
import { PhoneNumber } from "@shared/types/PhoneNumber";
import { QueryResult } from "pg";

type AddPhoneNumberArgs = {
  userId: number;
  phoneNumber: string;
};

const addPhoneNumber = async (args: AddPhoneNumberArgs) => {
  const { userId, phoneNumber } = args;
  const text = `INSERT INTO phone_numbers (user_id, phone_number) VALUES ($1, $2) RETURNING *;`;
  const values = [userId, phoneNumber];

  const res: QueryResult<PhoneNumber> = await pool.query(text, values);

  return res.rows[0];
};

export {addPhoneNumber}