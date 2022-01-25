import { logger } from '@logging';
import { redisSessionStore } from '@middleware/sessions';
import routes from '@routes';
import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';

import '@middleware/passport/passport';
import { errorHandler } from '@middleware/errorHandler';
import { morganLogger } from 'logging/morgan';

dotenv.config();

const app = express();
const port = String(process.env.PORT);

app.use(express.json());
app.use(morganLogger);
app.use(redisSessionStore);
app.use(passport.initialize());
app.use(passport.session());

app.use('/v1/auth', routes.v1.AuthRoute.router);
app.use('/v1/register', routes.v1.RegisterRoute.router);
app.use('/v1/users', routes.v1.UserRoute.router);

app.use(errorHandler);

app.listen(port, () => logger.info(`🚀 Express is listening at http://localhost:${port}`));
