import { loginHandler, loginWithProvider, logoutHandler } from '@controllers/LoginController';
import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post(
  '/login/local',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  loginHandler
);
router.post('/login/:provider', loginWithProvider);
router.post('/logout', logoutHandler);

export { router };
