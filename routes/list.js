import express from 'express';
import * as listController from '../controllers/List';
const router = express.Router();

router.get('/', async (req, res, next) => {
   const result = await listController.index();
   res.send(result);
});

router.post('/', async (req, res, next) => {
   res.send('post');
});

export default router;
