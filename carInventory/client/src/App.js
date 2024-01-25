// Importing necessary files and dependencies
import "./App.css";
import React, { useEffect, useState } from "react";
import AddCarForm from "./components/AddCarForm";
import UpdateManyForm from "./components/UpdateManyForm";
import DisplayOldCars from "./components/DisplayOldCars";
import UpdateCarForm from "./components/UpdateCarForm";

// Main App component
const App = () => {
  // State variables for managing car data and form visibility
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showUpdateManyForm, setShowUpdateManyForm] = useState(false);

  const handleUpdateClick = (car) => {
    setSelectedCar(car);
  };

  const handleUpdateManyClick = () => {
    setShowUpdateManyForm(true);
  };

  const handleCloseUpdateManyForm = () => {
    setShowUpdateManyForm(false);
  };

  // Function to add a new car to the database
  const addCar = async (newCar) => {
    try {
      const response = await fetch("/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });
      const data = await response.json();
      setCars([...cars, data]);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  // Function to delete a car from the database
  const deleteCar = async (id) => {
    try {
      await fetch(`/cars/${id}`, {
        method: "DELETE",
      });
      const updatedCars = cars.filter((car) => car._id !== id);
      setCars(updatedCars);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const updateCar = async (id, updatedCar) => {
    try {
      const response = await fetch(`/cars/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCar),
      });
      const data = await response.json();
      console.log("Car updated:", data);
      // Optionally update the car list in the state with the updated data
      const updatedCarList = cars.map((car) =>
        car._id === id ? { ...car, ...updatedCar } : car
      );
      setCars(updatedCarList);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  // Function to update many cars by make
  const updateCarsByMake = async (payload) => {
    console.log(payload); // Ensure payload is correct
    try {
      const response = await fetch("/cars/update-by-make", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Cars updated by make:", data);

      // Fetch the updated car data after the update
      const updatedCarsResponse = await fetch("/cars");
      const updatedCarsData = await updatedCarsResponse.json();

      // Update the state with the latest car data
      setCars(updatedCarsData);
      handleCloseUpdateManyForm(); // Close the form after updating
    } catch (error) {
      console.error("Error updating cars by make:", error);
    }
  };

  // Fetching car data from the server on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/cars");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchData();
  }, []);

  // Rendering the UI with the fetched car data and the AddCarForm component
  return (
    <div className="container">
      <h1 className="heading">Car Inventory</h1>
      <AddCarForm addCar={addCar} />
      <button onClick={handleUpdateManyClick}>Update Many Cars</button>
      {showUpdateManyForm && (
        <UpdateManyForm
          updateCarsByMake={updateCarsByMake}
          onClose={handleCloseUpdateManyForm}
        />
      )}
      <DisplayOldCars />
      {selectedCar && (
        <UpdateCarForm
          car={selectedCar}
          updateCar={updateCar}
          setSelectedCar={setSelectedCar}
        />
      )}
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            {/* Display car information */}
            <p>
              <strong>Make:</strong> {car.make}
            </p>
            <p>
              <strong>Model:</strong> {car.model}
            </p>
            <p>
              <strong>Registration Number:</strong> {car.registrationNumber}
            </p>
            <p>
              <strong>Current Owner:</strong> {car.currentOwner}
            </p>
            <button
              className="delete-button"
              onClick={() => deleteCar(car._id)}
            >
              Delete
            </button>
            <button
              className="update-button"
              onClick={() => handleUpdateClick(car)}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporting the App component for use in other files
export default App;
