import { findUserByUserId } from '@services/UserService';
import { NextFunction, Request, Response } from 'express';

const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    req.login(req.user, (err) => {
      if (err) {
        return next(err);
      }
    });

    const user = await findUserByUserId(req.user.user_id);

    res.json(user).status(200).send();
  }
};

const logoutHandler = (req: Request, res: Response, next: NextFunction) => {
  req.logout();
  req.session.destroy(function () {
    res.redirect('/');
  });
};

export { loginHandler, logoutHandler };
