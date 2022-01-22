import { AuthWithProviderService, JwtService } from '@services';

const execute = () => {
  AuthWithProviderService.execute();
  JwtService.createAuthJwt();
  return "hello world"
};

export { execute };
