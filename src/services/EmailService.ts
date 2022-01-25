import pool from "@db";
import { Email } from "@shared/types/Email";
import { QueryResult } from "pg";

type AddEmailArgs = {
  userId: number;
  email: string;
};

const addEmail = async (args: AddEmailArgs) => {
  const { userId, email } = args;
  const text = `INSERT INTO emails (user_id, email) VALUES ($1, $2) RETURNING *;`;
  const values = [userId, email];

  const res: QueryResult<Email> = await pool.query(text, values);

  return res.rows[0];
};

export {addEmail}