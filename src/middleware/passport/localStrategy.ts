import { comparePassword } from '@services/PasswordService';
import { findUserByEmail } from '@services/UserService';
import { Strategy as LocalStrategy } from 'passport-local';

const localStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', session: true },
  async function verify(email, password, cb) {
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }

      const validPassword = comparePassword(password, user.password_hash);
      if (!validPassword) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
);

export { localStrategy };
