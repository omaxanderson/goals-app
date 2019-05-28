import express from 'express';
import { setCompleted } from '../controllers/Review';

const router = express.Router();

router.post('/:goalId', async (req, res, next) => {
  const result = await setCompleted(req.params.goalId, req.body.completed);
  console.log(result);
  res.send(result);
});

router.get('/:goalId', async (req, res, next) => {
  res.send('hello get');
});
export default router;
