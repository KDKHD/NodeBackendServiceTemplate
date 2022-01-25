import pool from '@db';
import { User } from '@shared/types';
import { QueryResult } from 'pg';
import { generateHash } from './PasswordService';

const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const text = `SELECT u.* FROM "emails" e JOIN "users" u ON u.user_id = e.user_id WHERE e.email=$1;`;
  const values = [email];

  const res: QueryResult<User> = await pool.query(text, values);

  return res.rows[0];
};

const findUserByUserId = async (userId: string | number): Promise<User | undefined> => {
  const text = `SELECT u.* FROM "users" u WHERE u.user_id=$1;`;
  const values = [userId];

  const res: QueryResult<User> = await pool.query(text, values);

  return res.rows[0];
};

const createNewUser = async (
  firstName: string,
  lastName: string,
  password: string
): Promise<User> => {
  const passwordHash = generateHash(password);
  const text = `INSERT INTO users (first_name, last_name, password_hash) VALUES ($1, $2, $3) RETURNING *;`;
  const values = [firstName, lastName, passwordHash];

  const res: QueryResult<User> = await pool.query(text, values);

  return res.rows[0];
};

export { findUserByEmail, findUserByUserId, createNewUser };
