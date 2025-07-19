const express = require('express');
const router = express.Router();

const dashboardCtrl = require('../controllers/dashboard');
const securityMiddleware = require('../middlewares/security');

router.get('/', securityMiddleware.checkLogin, dashboardCtrl.getDashboardData);


module.exports = router;