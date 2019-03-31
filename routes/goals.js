import express from 'express';
import * as GoalsController from '../controllers/Goals';
const router = express.Router();

// GET a list of goals 
router.get('/', async (req, res, next) => {
	const params = {};
	try {
		const result = await GoalsController.getAll(1, params);
		console.log('result from router', JSON.stringify(result));
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
	res.send(JSON.stringify({
		from: 'goals.js',
		method: 'post',
	}));
});

// PUT create a new goal
router.put('/:goalId', async (req, res, next) => {
	res.send(JSON.stringify({
		from: 'goals.js',
		method: 'put',
	}));
});

// DELETE create a new goal
router.delete('/:goalId', async (req, res, next) => {
	res.send(JSON.stringify({
		from: 'goals.js',
		method: 'delete',
	}));
});

module.exports = router;
