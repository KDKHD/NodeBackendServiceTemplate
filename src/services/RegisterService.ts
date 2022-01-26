import pool from '@db';
import { User } from '@shared/types';
import { RequestContext } from '@type/requestContext';
import niceError from 'exceptions/niceError';
import { modifyContext } from 'utils/context';
import { getClient } from 'utils/pgClient';
import { addEmail } from './EmailService';
import { addPhoneNumber } from './PhoneNumberService';
import { createNewUser } from './UserService';

type RegisterUserArgs = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
};

const registerUser = async (
  args: RegisterUserArgs,
  ctx?: RequestContext
): Promise<User | undefined> => {
  const { firstName, lastName, password, email, phoneNumber } = args;

  ctx = modifyContext(ctx, { client: await pool.connect() });

  try {
    await getClient(ctx).query('BEGIN');

    const user = await createNewUser({ firstName, lastName, password }, ctx);
    await addEmail({ userId: user.user_id, email }, ctx);
    await addPhoneNumber({ userId: user.user_id, phoneNumber: phoneNumber }, ctx);

    await getClient(ctx).query('COMMIT');

    return user;
  } catch (err) {
    await getClient(ctx).query('ROLLBACK');
    if (err instanceof niceError) {
      throw err;
    } else {
      throw err;
    }
  }
};

export { registerUser };
