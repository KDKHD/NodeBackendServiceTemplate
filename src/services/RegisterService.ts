import pool from '@db';
import { User } from '@shared/types';
import niceError from 'exceptions/niceError';
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

const registerUser = async (args: RegisterUserArgs): Promise<User | undefined> => {
  const { firstName, lastName, password, email, phoneNumber } = args;

  // TODO: Unique email and phone numbers only
  try {
    await pool.query('BEGIN');

    const user = await createNewUser(firstName, lastName, password);
    await addEmail({ userId: user.user_id, email });
    await addPhoneNumber({ userId: user.user_id, phoneNumber: phoneNumber });

    await pool.query('COMMIT');
    return user;
  } catch (e) {
    await pool.query('ROLLBACK');
    if (e instanceof niceError) {
      throw e;
    } else {
      throw e;
    }
  }
};

export { registerUser };
