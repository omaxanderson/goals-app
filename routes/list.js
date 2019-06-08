import express from 'express';
import * as listController from '../controllers/List';

const router = express.Router();

router.get('/', async (req, res, next) => {
   const { f_goal_types } = req.query;
   const result = await listController.index(f_goal_types);
   res.send(JSON.stringify(result));
});

router.put('/', async (req, res, next) => {
   const result = await listController.update(req.body);
   res.send(JSON.stringify(result));
});

export default router;
