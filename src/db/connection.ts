import pg, { ClientConfig, Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const getCredentials = (): ClientConfig => {
  return {
    connectionString: process.env.DATABASE_URL,
  };
};

export default new Pool(getCredentials());
