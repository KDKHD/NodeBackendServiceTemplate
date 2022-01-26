import pool from '@db';
import { RequestContext } from '@type/requestContext';

const getClient = (ctx?: RequestContext) => {
  if (ctx?.client) return ctx.client;
  return pool;
};

export { getClient };
