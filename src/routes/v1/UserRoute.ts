import { loggedInUserHandler } from '@controllers/UserController';
import express from 'express';

const router = express.Router();

router.get('/me', loggedInUserHandler);

export { router };
