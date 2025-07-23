const dashboardModel = require('../models/dashboard')
const getDashboardData = async (req, res) => {

try {
console.log('Test');
console.log('User from req:', req.user);

//res.json ({
//message: 'Dashboard data placeholder',
//user: req.user
//});

const appointmentsToday = await dashboardModel.getAppointmentsForToday();
  console.log("Appointments for Today:", appointmentsToday);
if (appointmentsToday.length === 0) {
    return res.json({
        message:"You have no appointments today",
        appointments: []
    });
}

res.json({
    message:"Appointments Today",
        appointments : appointmentsToday
});


}catch (err) {
    console.error('Error in dashboard controller:', err);
    res.status(500).json({message:'Failed to load dashboard', error: err.message});
}

};

module.exports = {
    getDashboardData
}