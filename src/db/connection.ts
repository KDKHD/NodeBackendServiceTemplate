import pg, { ClientConfig, Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const getCredentials = (env?: string): ClientConfig => {
  switch (env) {
    case 'production':
      return {};
    case 'development':
    default:
      return {
        connectionString: process.env.DEVELOPMENT_DATABASE_URL,
      };
  }
};

export default new Pool(getCredentials(process.env.NODE_ENV));
