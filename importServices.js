require("dotenv").server();
const mongoose = require("mongoose");
const Service = require("./daos/service");
const servicesData = require("./data/servicesData");


const importServices=async()=> {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected");

    // Insert all services
    await Service.insertMany(servicesData);
    console.log("Services imported successfully");

    mongoose.disconnect();
  } catch (err) {
    console.error("Error importing services:", err);
  }
}

importServices();