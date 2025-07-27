const express = require("express");
const router = express.Router();
const Service = require("../schema/service");


//get all services
router.get("/",async(req,res) => {

try {
    const services = await Service.find({});
    res.json(services);
} catch (error) {
res.status(500).json({message: error.message});

}
})

module.exports = router;