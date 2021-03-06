import express from 'express';
import * as GoalsController from '../controllers/Goals';

const router = express.Router();

// GET a list of goals
router.get('/', async (req, res, next) => {
   const { query } = req;
   try {
      const result = await GoalsController.getAll(1, query);
      // console.log('result from router', JSON.stringify(result));
      res.send(JSON.stringify(result));
   } catch (e) {
      console.log(e);
      res.send(e);
   }
});

// GET a specific goal
router.get('/:goalId', async (req, res, next) => {
   res.send(JSON.stringify({
      from: 'goals.js',
      method: 'get single',
   }));
});

// POST create a new goal
router.post('/', async (req, res, next) => {
   try {
      const result = await GoalsController.create(req.body);
      res.send(JSON.stringify(result));
   } catch (e) {
      console.log(e);
      console.log('catching from router');
      res.status(400);
      res.send(JSON.stringify(e));
   }
});

// PUT create a new goal
router.put('/:goalId', async (req, res, next) => {
   try {
      const result = await GoalsController.update(req.params.goalId, req.body);
      res.send(JSON.stringify(result));
   } catch (e) {
      console.log(e);
      res.status(400);
      res.send(e);
   }
});

// DELETE specific goal
router.delete('/:goalId', async (req, res, next) => {
   try {
      const result = await GoalsController.remove(req.params.goalId);
      res.send(JSON.stringify(result));
   } catch (e) {
      res.status(400);
      res.send(e);
   }
});

module.exports = router;
