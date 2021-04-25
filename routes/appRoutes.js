const router = require('express').Router();

const appController = require('../controllers/appController')();

router.get('/status', appController.appStatus);

module.exports = router;
