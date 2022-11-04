const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();

const txsRouter = require('./txs.js');
const cacheMiddleware = require('../middlewares/cache-middleware.js');

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/txs', middleware.user(), cacheMiddleware({ timeout: 30 * 60 * 1000 }), txsRouter);

module.exports = router;
