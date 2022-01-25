import pool from '@db';
import niceError from 'exceptions/niceError';

import { QueryResult } from 'pg';
import { fString } from 'utils/string';
import { Email } from '@shared/types/Email';
import { emailServiceMessages as messages } from './EmailService.messages';

type AddEmailArgs = {
  userId: number;
  email: string;
};

const addEmail = async (args: AddEmailArgs) => {
  const { userId, email } = args;

  try {
    const text = `INSERT INTO emails (user_id, email) VALUES ($1, $2) RETURNING *;`;
    const values = [userId, email];

    const res: QueryResult<Email> = await pool.query(text, values);

    return res.rows[0];
  } catch (e: any) {
    if (e.code == '23505' && e.constraint == 'emails_email_key') {
      throw new niceError(messages.existingEmail.id, 400);
    } else {
      throw e;
    }
  }
};

export { addEmail };
