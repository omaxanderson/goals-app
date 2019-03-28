import express from 'express';
import QueryBuilder from '../database/QueryBuilder';
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
	res.send('test');
});

module.exports = router;
