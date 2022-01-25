import { findUserByUserId } from '@services/UserService';
import passport from 'passport';
import { localStrategy } from './localStrategy';

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await findUserByUserId(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
