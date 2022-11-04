const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();

const txsRouter = require('./txs.js');

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/txs', middleware.user(), txsRouter);

module.exports = router;
