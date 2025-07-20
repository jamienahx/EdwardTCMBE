const express = require('express');
const router = express.Router();

//import the controller 
const appointmentController = require('../controllers/appointmentController');


//define routes
router.post('/createAppointment', appointmentController.createAppointmentFinal);



router.get('/',appointmentController.fetchAppointmentFinal);
router.get('/:appointmentId',appointmentController.fetchAppointmentParamsFinal);

module.exports = router;