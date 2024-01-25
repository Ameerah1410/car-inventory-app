const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/", carController.getAllCars);
router.get("/api/old-cars", carController.getOldCars);
router.post("/", carController.addCar);
router.put("/update/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);
router.get("/by-make", carController.getCarsByMake);
router.put("/update-by-make", carController.updateCarsByMake);

// Exporting the defined router to be used in other files
module.exports = router;
