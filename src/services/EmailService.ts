import niceError from 'exceptions/niceError';

import { QueryResult } from 'pg';
import { Email } from '@shared/types/Email';
import { emailServiceMessages as messages } from './EmailService.messages';
import { pgErrors } from 'utils/pgErrorCodes';
import { getClient } from 'utils/pgClient';
import { RequestContext } from '@type/requestContext';

type AddEmailArgs = {
  userId: number;
  email: string;
};

const addEmail = async (args: AddEmailArgs, ctx?: RequestContext) => {
  const { userId, email } = args;

  try {
    const text = `INSERT INTO emails (user_id, email) VALUES ($1, $2) RETURNING *;`;
    const values = [userId, email];

    const res: QueryResult<Email> = await getClient(ctx).query(text, values);

    return res.rows[0];
  } catch (e: any) {
    if (pgErrors.isDuplicateKey(e) && e.constraint == 'emails_email_key') {
      throw new niceError(messages.existingEmail.id, 400);
    } else {
      throw e;
    }
  }
};

export { addEmail };
