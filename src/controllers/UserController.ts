import { NextFunction, Request, Response } from 'express';

const loggedInUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user).status(200);
};

export { loggedInUserHandler };
