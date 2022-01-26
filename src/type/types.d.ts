import { User as CustomUser } from '@shared/types';

declare global {
  namespace Express {
    interface User extends CustomUser {}
  }
}
