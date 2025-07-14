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

try {
    // take the category and name from whatever the user has provided
const selectedTreatments = data.treatments //this is an array received from the FE containing sth like { category: "Standard Treatment", english_name: "Moxibustion(partial)" } in case the user selects multiple treatments.

//error handler to snrure no empty treatment fields
if(!selectedTreatments || selectedTreatments.length === 0){
    throw new Error("No treatments selected");

}

//do a VLOOKUP into the service schema using the name and category
//Select * from Service where treatments in '-whatever user has selected in FE'
  const serviceFind = await servicedao.find({
       english_name: { $in: selectedTreatments.map(treatment => treatment.english_name)}
    });

//error handling if no matching services are found in the service table
if (serviceFind.length === 0) {
  throw new Error("No treatments found for the provided names.");
}

//using name, return the treatment IDs  services table

  const treatmentIds = serviceFind.map(s => s._id);

//create an appt using data from FE + the treatment IDs.
const appointment = await appointmentdao.create({
    ...data,
    treatments: treatmentIds
  });

  return appointment; 
} catch (err) {
    console.log(err);
    throw new Error(`Error creating appointment: ${err.message}`);
    }   
}

//Fetch the appointment details with treatment info to give this to the FE
async function fetchAppointmentWithDetails(appointmentId) {

try {

    //get the appointment id first. search it in the appointment schema. 
    //fetch the appointment details (english_name, starting price) using the ID given
    //SELECT * FROM appointments WHERE id = 'appointmentID';
    const appointment = await appointmentdao
    .findById(appointmentId)
    .populate('treatments', 'english_name starting_price') //can change this. This part of the code is fetching the english name and price using the ID
    .exec();

    //error handling to ensure that appointment can be found. 
    if (!appointment) {
    throw new Error('Appointment not found');
    }

    //The appointment table will contain the treatment IDs (from the Vlookup performed in createAppointment)
    //Use the treatment IDs to fetch the treatment details from the service schema.
    //SELECT * FROM service WHERE id IN ('appointment.treatments');

    //attach the treatment details into the appointment
    appointment.treatmentDetails = treatments.map(treatment => ({
        name: treatment.english_name, //can omit or add other details
        price: treatment.starting_price
    }));

    return appointment;
} catch (err) {
    console.error(err);
    throw new Error(`Error fetching appointment details: ${err.message}`);
}
}

