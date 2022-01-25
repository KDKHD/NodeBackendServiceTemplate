import { loginHandler } from '@controllers/LoginController';
import { registerHandler } from '@controllers/RegisterController';
import express from 'express';

const router = express.Router();

router.post('/local', registerHandler, loginHandler);

export { router };
