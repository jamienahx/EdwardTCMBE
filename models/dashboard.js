// models/appointment.js
const Appointment = require("../schema/appointmentSchema");

async function getAppointmentsForToday() {
  const today = new Date();  // Get current date
const startOfDay = new Date(today);  // Copy today's date
  startOfDay.setHours(0, 0, 0, 0);  // Start of today (midnight)

  const endOfDay = new Date(today);  // Copy today's date again
  endOfDay.setHours(23, 59, 59, 999);  // End of today (11:59:59.999 PM)

  // Format startOfDay and endOfDay to match dtring date format
  const formattedStartDate = startOfDay.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const formattedEndDate = endOfDay.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  try {
    // select * from appointment where date between 12am and 11.59pm
    const appointments = await Appointment.find({
      date: {
        //$gte greater than or equal to, $lte less than or equal to
        $gte: formattedStartDate,
        $lte: formattedEndDate
      }
    });

    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}

module.exports = {
  getAppointmentsForToday
};
