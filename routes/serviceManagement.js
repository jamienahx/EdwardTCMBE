const express = require('express');
const router = express.Router();

const securityMiddleware = require('../middlewares/security');
const serviceController = require('../controllers/serviceManagement');

router.use(securityMiddleware.checkLogin);

router.get('/',serviceController.getAllServices);
router.post('/', serviceController.createService);
router.put('/:id',serviceController.updateService);
router.delete('/:id', serviceController.deleteService);
module.exports = router;



    
