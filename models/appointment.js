//require Service from service schema
const servicedao = require("../daos/service"); 
//require appointment from appointment schema
const appointmentdao = require("../daos/appointment");

module.exports = {
    createAppointment,
    fetchAppointmentWithDetails
}; 

//create the  appointment

async function createAppointment(data) { //data that is passed in from the FE thru controller file. contains date time, senior citizen etc...
// take the category and name from whatever the user has provided
const selectedTreatments = data.treatments //this is an array received from the FE containing sth like { category: "Standard Treatment", english_name: "Moxibustion(partial)" } in case the user selects multiple treatments.

//do a VLOOKUP into the service schema using the name and category
  const serviceFind = await servicedao.find({
        $or: selectedTreatments.map(treatment => ({
            english_name: treatment.english_name, 
            category: treatment.category           
        }))
    });
//using category and name, return the treatment IDs  services table

  const treatmentIds = serviceFind.map(s => s._id);

//create an appt using data from FE + the treatment IDs.
const appointment = await appointmentdao.create({
    ...data,
    treatments: treatmentIds
  });

  return appointment; 
};

//Fetch the appointment details with treatment info to give this to the FE
async function fetchAppointmentWithDetails(appointmentId) {

    //get the appointment id first. search it in the appointment schema. 
    //SELECT * FROM appointments WHERE id = 'appointmentID';
    const appointment = await appointmentdao.findById(appointmentId);

    //The appointment table will contain the treatment IDs (from the Vlookup performed in createAppointment)
    //Use the treatment IDs to fetch the treatment details from the service schema.
    //SELECT * FROM service WHERE id IN ('appointment.treatments');

    const treatments = await servicedao.find({
        _id: { $in: appointment.treatments }
    });


    //attach the treatment details into the appointment
    appointment.treatmentDetails = treatments.map(treatment => ({
        name: treatment.english_name, //can omit or add other details
        price: treatment.starting_price
    }));

    return appointment;

}

