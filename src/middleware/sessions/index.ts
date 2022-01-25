import session from 'express-session';
import ConnectPgSimple from 'connect-pg-simple';
import pool from '@db';

const pgSession = ConnectPgSimple(session);

const redisSessionStore = session({
  store: new pgSession({
    pool: pool,
  }),
  saveUninitialized: false,
  secret: 'keyboard cat', // TODO: update secret
  resave: false,
});

export { redisSessionStore };
