import niceError from 'exceptions/niceError';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof niceError) {
    res.status(err.code);
    res.json(err.getJson());
  } else {
    res.status(500);
    res.json({ message: err.message });
  }
  res.send();
};

export { errorHandler };
