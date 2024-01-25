// Importing the Car model
const Car = require("../models/car");

// Controller function to retrieve all cars
const getAllCars = async (req, res, next) => {
  try {
    // Retrieving all cars from the database
    const cars = await Car.find();
    // Sending the retrieved cars as a JSON response
    res.json(cars);
  } catch (err) {
    // Passing any caught errors to the error handling middleware
    next(err);
  }
};

// Controller function to retrieve old cars based on a certain make
const getOldCars = async (req, res, next, make) => {
  try {
    // Getting the current year
    const currentYear = new Date().getFullYear();
    // Calculating a five-year span
    const fiveYearsAgoYear = currentYear - 5;
    // Finding cars that were manufactured before the calculated year
    const oldCars = await Car.find({
      make: { $lt: fiveYearsAgoYear },
    });
    // Sending the retrieved old cars as a JSON response
    res.json(oldCars);
  } catch (err) {
    // Passing any caught errors to the error handling middleware
    next(err);
  }
};

// Controller function to add a new car to the database
const addCar = async (req, res, next) => {
  try {
    // Creating a new Car instance with the request body data
    const newCar = new Car(req.body);
    // Saving the new car to the database
    const savedCar = await newCar.save();
    // Sending the saved car as a JSON response
    res.json(savedCar);
  } catch (err) {
    // Passing any caught errors to the error handling middleware
    next(err);
  }
};

//controller to update single car
const updateCar = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if id is not provided or is invalid
    if (!id) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    const updatedCarData = req.body;
    const updatedCar = await Car.findByIdAndUpdate(id, updatedCarData, {
      new: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(updatedCar);
  } catch (err) {
    console.error(err);
  }
};

// Controller function to delete a specific car from the database
const deleteCar = async (req, res, next) => {
  try {
    // Extracting the car ID from the request parameters
    const { id } = req.params;
    // Deleting the specified car from the database
    await Car.findByIdAndDelete(id);
    // Sending a success message as a JSON response
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    // Passing any caught errors to the error handling middleware
    next(err);
  }
};

const getCarsByMake = async (req, res) => {
  try {
    const { make } = req.query;
    const cars = await Car.find({ make: { $eq: make } });
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars by make:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCarsByMake = async (req, res, next) => {
  try {
    const { make, updatedData } = req.body;

    console.log("Make:", make);
    console.log("Updated Data:", updatedData);

    // Explicitly log the query criteria
    const queryCriteria = { make: make };
    console.log("Query Criteria:", queryCriteria);

    // Update the current owner for all cars with the specified make
    const result = await Car.updateMany(queryCriteria, {
      $set: { currentOwner: updatedData.currentOwner },
    });

    console.log("Update Result:", result);

    // Find and return the updated documents
    const updatedCars = await Car.find(queryCriteria);

    if (result.modifiedCount > 0) {
      return res.json({
        message: `${result.modifiedCount} cars updated successfully`,
        updatedCars: updatedCars,
      });
    } else {
      return res.json({ message: `No cars found for the specified make` });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Exporting the defined controller functions for use in other files
module.exports = {
  getAllCars,
  getOldCars,
  addCar,
  updateCar,
  deleteCar,
  getCarsByMake,
  updateCarsByMake,
};
