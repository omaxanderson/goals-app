import express from 'express';
const router = express.Router();

// GET a list of goals 
router.get('/', (req, res, next) => {
	res.send(JSON.stringify({
		from: 'goals.js',
		method: 'get',
	}));
});

// GET a specific goal 
router.get('/:goalId', (req, res, next) => {
	res.send(JSON.stringify({
		from: 'goals.js',
		method: 'get single',
	}));
});

// POST create a new goal
router.post('/', (req, res, next) => {
	res.send(JSON.stringify({
		from: 'goals.js',
		method: 'post',
	}));
});

// PUT create a new goal
router.put('/:goalId', (req, res, next) => {
	res.send(JSON.stringify({
		from: 'goals.js',
		method: 'put',
	}));
});

// DELETE create a new goal
router.delete('/:goalId', (req, res, next) => {
	res.send(JSON.stringify({
		from: 'goals.js',
		method: 'delete',
	}));
});

module.exports = router;
