var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/user');
const securityMiddleware = require('../middlewares/security');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', userCtrl.createUser); //can be public

router.post('/login', userCtrl.loginUser); //can be public


module.exports = router;
