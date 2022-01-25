import { registerUser } from '@services/RegisterService';
import { NextFunction, Request, Response } from 'express';

const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerUser(req.body);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export { registerHandler };
