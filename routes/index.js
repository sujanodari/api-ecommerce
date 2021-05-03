const router = require('express').Router();

const appRouter = require('./appRoutes');

router.use('/v1/', appRouter);
module.exports = router;
