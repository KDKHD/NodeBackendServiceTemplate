import { LoginWithProviderService } from '@services';
import { Request, Response } from 'express';

const loginWithProvider = (req: Request, res: Response) => {
  const result = LoginWithProviderService.execute();
  res.json({ message: result });
};

export { loginWithProvider };
