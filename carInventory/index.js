// Importing required modules
const express = require("express");
const mongoose = require("mongoose");

// Importing route files
const carRoutes = require("./routes/carRoutes");
const { updateCar, getOldCars } = require("./controllers/carController");

// Creating an instance of the Express application
const app = express();
// Defining the port for the server to run on, using the environment variable or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Connection URI for MongoDB Atlas
const connectionUri =
  "mongodb+srv://Ameerah14:Basic1012@hyperiondevtasks.y7esotx.mongodb.net/carInventory";

// Connect to MongoDB using the defined connection URI
mongoose.connect(connectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Storing the reference to the MongoDB connection
const db = mongoose.connection;
// Handling any connection errors
db.on("error", console.error.bind(console, "connection error:"));
// Logging a success message upon successful connection to MongoDB
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Middleware for parsing incoming request bodies as JSON
app.use(express.json());

// Mounting the route files
app.use("/cars", carRoutes);

app.put("/cars/:id", async (req, res, next) => {
  try {
    // Call the updateCar function with the provided request parameters and body
    const result = await updateCar(req.params.id, req.body);
    // Send a success message or the updated car as a JSON response
    res.json(result);
  } catch (error) {
    // Handle any errors and pass them to the error handling middleware
    next(error);
  }
});

app.get("/api/old-cars", (req, res, next) => {
  const { make } = req.query; // Extract the make parameter from the request query
  getOldCars(req, res, next, make); // Pass the make parameter to the getOldCars function
});

// Error handling middleware to catch any unhandled errors and send an appropriate response
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Starting the Express server to listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
