//require Service from service schema
const servicedao = require("../schema/service"); 
//require appointment from appointment schema
const appointmentSchema = require("../schema/appointmentSchema");
//create the appointment function for the FE to use, refer to appointmentSchema for requirements
const createAppointment=async(data)=> {
try {
//treatment is passed as array, so we use data.treatment to access it, sort into names without duplicates
const treatmentSelection = [... new Set(data.treatments.map((element)=>{return element.english_name})) ]
//error if selected treatment is empty
if(!treatmentSelection || treatmentSelection.length === 0){
    throw new Error("No treatments selected")}
//$in checks the matched names in the array, returns all the object matching the english name
const treatmentJson = await servicedao.find({english_name: { $in: treatmentSelection}});
//error handling if no matching services are found in the service table
if (treatmentJson.length === 0) {
  throw new Error("No treatments found for the provided names.");
}
//using name, return the treatment IDs services table
const treatmentIds = treatmentJson.map((element) => {return element._id})
//It should return
// {
//   _id: "6699e2bf415f5e17b31b8320",
//   name: "John Doe",
//   date: "2025-07-21",
//   time: "14:30",
//   treatments: [
//     "66888e1ab41e1f23371a1145",
//     "66888e1ab41e1f23371a1147"
//   ],
//   extraComments: "Please focus on lower back pain.",
//   createdAt: "2025-07-19T06:32:15.923Z",
//   updatedAt: "2025-07-19T06:32:15.923Z",
//   __v: 0
// }
const appointment = await appointmentSchema.create({
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
const fetchAppointmentWithDetails= async (appointmentId)=> {
try {
    //get the appointment id first. search it in the appointment schema. 
    //fetch the appointment details (english_name, starting price) using the ID given
    //SELECT * FROM appointments WHERE id = 'appointmentID';
    const appointment = await appointmentSchema
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

module.exports = {
    createAppointment,
    fetchAppointmentWithDetails
}; 
