import niceError from 'exceptions/niceError';

import { QueryResult } from 'pg';
import { PhoneNumber } from '@shared/types/PhoneNumber';
import { phoneNumberServiceMessages as messages } from './PhoneNumberService.messages';
import { pgErrors } from 'utils/pgErrorCodes';
import { getClient } from 'utils/pgClient';
import { RequestContext } from '@type/requestContext';

type AddPhoneNumberArgs = {
  userId: number;
  phoneNumber: string;
};

const addPhoneNumber = async (args: AddPhoneNumberArgs, ctx?: RequestContext) => {
  const { userId, phoneNumber } = args;
  try {
    const text = `INSERT INTO phone_numbers (user_id, phone_number) VALUES ($1, $2) RETURNING *;`;
    const values = [userId, phoneNumber];

    const res: QueryResult<PhoneNumber> = await getClient(ctx).query(text, values);

    return res.rows[0];
  } catch (e: any) {
    if (pgErrors.isDuplicateKey(e) && e.constraint == 'phone_numbers_phone_number_key') {
      throw new niceError(messages.phoneNumberExists.id, 400);
    } else {
      throw e;
    }
  }
};

export { addPhoneNumber };
