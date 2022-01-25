import bcrypt from 'bcryptjs';

const comparePassword = (plainText: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plainText, hash);
};

const generateHash = (plainText: string) => {
  return bcrypt.hashSync(plainText, 8);
};

export { comparePassword, generateHash };
