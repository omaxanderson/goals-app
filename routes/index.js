import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
   res.send(JSON.stringify({
      hello: 'get',
      health: 'ok',
   }));
});

module.exports = router;
