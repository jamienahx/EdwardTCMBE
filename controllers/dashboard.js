const getDashboardData = async (req, res) => {

try {
console.log('Test');
console.log('User from req:', req.user);

res.json ({
message: 'Dashboard data placeholder',
user: req.user
});

}catch (err) {
    console.error('Error in dashboard controller:', err);
    res.status(500).json({message:'Failed to load dashboard', error: err.message});
}

};

module.exports = {
    getDashboardData
}