const mongoose = require("mongoose");

// user = { "email": "abc@xyz.com", "password": "12345678" }

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true }, 
  password: {type: String, required: true},
  jwt: {type: String},
  is_admin: {type: Boolean, default: false},
  name: {type:String},
});

// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("User", userSchema);