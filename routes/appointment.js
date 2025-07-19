const express = require('express');
const router = express.Router();

//import the controller 
const appointmentController = require('../controllers/appointmentController');


//define routes
router.post('/', appointmentController.addAppointment);

router.get('/:appointmentId',appointmentController.getAppointmentWithDetails);

module.exports = router;