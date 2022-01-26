import { ClientBase } from 'pg';

type RequestContext = {
  client: ClientBase;
};

export { RequestContext };
