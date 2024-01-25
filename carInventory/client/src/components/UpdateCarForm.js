import React, { useState } from "react";

const UpdateCarForm = ({ car, updateCar, setSelectedCar }) => {
  const [formData, setFormData] = useState({
    make: car.make,
    model: car.model,
    registrationNumber: car.registrationNumber,
    currentOwner: car.currentOwner,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCar(car._id, formData);
      setSelectedCar(null); // Reset selected car to hide the form
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <div>
      <h2>Update Car</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="make"
          placeholder="Make"
          value={formData.make}
          onChange={handleChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
        />
        <input
          type="text"
          name="registrationNumber"
          placeholder="Registration Number"
          value={formData.registrationNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="currentOwner"
          placeholder="Current Owner"
          value={formData.currentOwner}
          onChange={handleChange}
        />
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default UpdateCarForm;
