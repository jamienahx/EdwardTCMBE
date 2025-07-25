var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// router.post('/create', userCtrl.createUserFinal); //can be public
router.post('/login', userCtrl.loginUserFinal); //can be public
module.exports = router;
