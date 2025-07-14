const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: {type: String},

  date: { type: Date, required: true },        
  time: { type: String, required: true },  
  
  consultationType: {
    type: String,
    enum: ['first', 'follow-up'],
    required: true
  },

  seniorCitizen: { type: Boolean, required: true },

  treatments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',    
    required: true
  }],  //each appt can have multiple treatments, so we want to store this as an array of ObjectIDs where each ID corresponds to the ID in the treatments table.

  extraComments: { type: String },

}, {
  timestamps: true  // adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Appointment', appointmentSchema);
