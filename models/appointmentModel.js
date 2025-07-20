    //appointmentModel.js
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

    // Fetch the appointment details with treatment info to give this to the FE
    const fetchAppointment = async () => {
  try {
    const allAppointments = await appointmentSchema
      .find()
      .populate('treatments', 'english_name starting_price')
      .exec();

    if (!allAppointments || allAppointments.length === 0) {
      throw new Error('No appointments found');
    }

    // Map each appointment to transform its treatments
    const formattedAppointments = allAppointments.map(appointment => {
      const simplifiedTreatments = appointment.treatments.map(treatment => ({
        name: treatment.english_name,
        price: treatment.starting_price
      }));

      return {
        ...appointment.toObject(),
        treatments: simplifiedTreatments,  // replace treatments array with simplified version
      };
    });

    return formattedAppointments;
  } catch (err) {
    console.error(err);
    throw new Error(`Error fetching appointment details: ${err.message}`);
  }
};

    // Fetch the appointment details with treatment info to give this to the FE
    const fetchAppointmentParams= async (appointmentId)=> {
    try {
        const appointment = await appointmentSchema
        .findById(appointmentId)
        .populate('treatments', 'english_name starting_price')
        .exec();

        //error handling to ensure that appointment can be found. 
        if (!appointment) {
        throw new Error('Appointment not found');
        }

        appointment.changeTreatmentsToName = appointment.treatments.map((element) => ({
            name: element.english_name, //can omit or add other details
            price: element.starting_price
        }));

        return appointment;
    } catch (err) {
        console.error(err);
        throw new Error(`Error fetching appointment details: ${err.message}`);
    }
    }

    module.exports = {
        createAppointment,
        fetchAppointment,
        fetchAppointmentParams,
    }; 
