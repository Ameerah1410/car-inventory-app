// Importing the Mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Defining the schema for the 'Car' model
const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  currentOwner: {
    type: String,
    required: true,
  },
});

// Creating the 'Car' model based on the defined schema
const Car = mongoose.model("Car", carSchema);

// Exporting the 'Car' model to be used in other files
module.exports = Car;
