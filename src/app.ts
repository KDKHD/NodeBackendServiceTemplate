import { logger } from '@logging';
import routes from '@routes';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = String(process.env.PORT);

app.use('/v1/auth', routes.v1.AuthRoute.router);

app.listen(port, () => logger.info(`🚀 Express is listening at http://localhost:${port}`));
