const appointmentModel = require('../models/appointment');

module.exports = {
  addAppointment,
  getAppointmentWithDetails
};

//add appointments

async function addAppointment(req, res) {
  try {
    //create an appt using the data from request body/FE (createAppointment is in the models file)
    const appointment = await appointmentModel.createAppointment(req.body);

    //return response with the appointment data
    res.json({ message: "Appointment created", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating appointment" });
  }

}

//Fetch the appointment with details to give to the front end (performed in the models file) BE will send ALL details, FE can choose which fields to display.
//fetchappointmentwith details is in the models file
async function getAppointmentWithDetails(req, res) {


try {

//get the appointment ID 
//get appt ID from route params. have to set this up in the routes file. 
//GET /appointments/60c72b2f9e1d4e9b9a8a2a1a

const {appointmentId} = req.params

//get the rest of the appointment details using the appointment ID
const appointment = await appointmentModel.fetchAppointmentWithDetails(appointmentId);

if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

//return the appointment to the FE
res.json({message: "Appointment found", appointment});
} catch (err) {
    console.error(err)

res.status(500).json({ message: "Error fetching appointment details" });
    
}

}

//FE can show something like:
    //  const treatments = appointment.treatments.map(treatment => treatment.english_name).join(", ");
      //const message = `Hi, you have booked ${treatments} at ${appointment.time} on ${appointment.date}.`;
