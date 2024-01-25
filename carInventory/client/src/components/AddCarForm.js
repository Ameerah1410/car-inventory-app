import React, { useState } from "react";

// Component for adding a new car
const AddCarForm = ({ addCar }) => {
  // Initializing state variables for input fields
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [currentOwner, setCurrentOwner] = useState("");

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Calling the addCar function with the input values
    addCar({ make, model, registrationNumber, currentOwner });
    // Resetting the state of input fields to empty strings
    setMake("");
    setModel("");
    setRegistrationNumber("");
    setCurrentOwner("");
  };

  // Rendering the form for adding a new car
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <strong>Make:</strong>
      </label>
      <input
        type="text"
        value={make}
        onChange={(e) => setMake(e.target.value)}
        required
      />
      <label>
        <strong>Model:</strong>
      </label>
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />
      <label>
        <strong>Registration Number:</strong>
      </label>
      <input
        type="text"
        value={registrationNumber}
        onChange={(e) => setRegistrationNumber(e.target.value)}
        required
      />
      <label>
        <strong>Current Owner:</strong>
      </label>
      <input
        type="text"
        value={currentOwner}
        onChange={(e) => setCurrentOwner(e.target.value)}
        required
      />
      <button type="submit">Add Car</button>
    </form>
  );
};

// Exporting the AddCarForm component for use in other files
export default AddCarForm;
