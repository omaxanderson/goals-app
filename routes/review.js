import express from 'express';
import { test } from '../controllers/Review';
const router = express.Router();

router.post('/:goalId', async (req, res, next) => {
   const result = await test(req.params.goalId);
   console.log(result);
   res.send(result);
});

router.get('/:goalId', async (req, res, next) => {
   res.send('hello get');
});
export default router;
