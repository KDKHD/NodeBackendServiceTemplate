import { User } from '@shared/types';
import { addEmail } from './EmailService';
import { addPhoneNumber } from './PhoneService';
import { createNewUser } from './UserService';

type RegisterUserArgs = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
};

const registerUser = async (args: RegisterUserArgs): Promise<User> => {
  const { firstName, lastName, password, email, phoneNumber } = args;

  // TODO: Unique email and phone numbers only
  
  const user = await createNewUser(firstName, lastName, password);

  await addEmail({ userId: user.user_id, email });
  await addPhoneNumber({ userId: user.user_id, phoneNumber: phoneNumber });

  return user;
};

export {registerUser}
