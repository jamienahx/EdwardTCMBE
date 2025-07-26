// models/appointment.js
const Appointment = require("../schema/appointmentSchema");

async function getAppointmentsForToday() {
    const today = new Date();  // Get current date
    const startOfDay = new Date(today);  // Copy today's date
    startOfDay.setHours(0, 0, 0, 0);  // Start of today (midnight)

    const endOfDay = new Date(today);  // Copy today's date again
    endOfDay.setHours(23, 59, 59, 999);  // End of today (11:59:59.999 PM)

    // Format startOfDay and endOfDay to match string date format
    const formattedStartDate = startOfDay.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const formattedEndDate = endOfDay.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

    try {
        // Fetch appointments for today within the date range
        const appointments = await Appointment.find({
            date: {
                $gte: formattedStartDate,
                $lte: formattedEndDate
            }
        })
        .populate('treatments', 'english_name starting_price')  // Populate treatments with relevant fields
        .exec();  // Execute the query

        // Check if no appointments are found
        if (!appointments || appointments.length === 0) {
            throw new Error('No appointments found for today');
        }
            return appointment;
       
} catch (err) {
        console.error(err);
        throw new Error(`Error fetching appointments for today: ${err.message}`);
    }
}
module.exports = {
    getAppointmentsForToday
};
