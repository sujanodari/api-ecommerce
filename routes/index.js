const router = require('express').Router();

const appRouter = require('./appRoutes');
const orderRouter = require('./orderRoutes');
const userRouter = require('./userRoutes');

router.use('/v1/', appRouter);
router.use('/v1/users', userRouter);
router.use('/v1/orders', orderRouter);
module.exports = router;
