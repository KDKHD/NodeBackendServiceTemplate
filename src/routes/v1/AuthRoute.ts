import { LoginController } from '@controllers';
import pool from '@db';
import express from 'express';

const router = express.Router();

router.post('/login/:provider', LoginController.loginWithProvider);
router.get('/test/:id', async (req, res, next) => {
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [req.params.id]);
  res.send(result.rows[0]);
});

export { router };
