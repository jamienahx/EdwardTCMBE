const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
   english_name: { type: String, required: true },
   chinese_name: { type: String, required: true },
   starting_price: { type: String, required: true },
    description: { type: String },
    category: {
    type: String,
    enum: ["Consultation", "Medication", "TCM Wellness Program","Package Price","Standard Treatment", "Featured Treatment"],
    required: true
  }
});


// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("Service", serviceSchema);