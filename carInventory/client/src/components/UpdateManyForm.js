import React, { useState } from "react";

const UpdateManyForm = ({ updateCarsByMake, onClose }) => {
  const [make, setMake] = useState("");
  const [matchingCars, setMatchingCars] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    currentOwner: "",
  });

  const handleMakeChange = (e) => {
    const enteredMake = e.target.value;
    setMake(enteredMake);

    // Fetch matching cars when make is entered
    fetchMatchingCars(enteredMake);
  };

  const fetchMatchingCars = async (enteredMake) => {
    try {
      const response = await fetch(`/cars/by-make?make=${enteredMake}`);

      if (response.ok) {
        const data = await response.json();
        setMatchingCars(data);
      } else {
        // Handle non-successful response (e.g., show an error message)
        console.error("Error fetching matching cars:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching matching cars:", error);
    }
  };

  const handleUpdatedDataChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateClick = async () => {
    try {
      if (make && Object.values(updatedData).some(Boolean)) {
        // Construct the payload with make and updatedData
        const payload = { make: make, updatedData: updatedData };
        // Call the updateCarsByMake function with the payload
        await updateCarsByMake(payload);
        // Update only the matching cars in the state
        // Reset form inputs
        setMake("");
        setUpdatedData({
          currentOwner: updatedData.currentOwner,
        });
        setMatchingCars([]); // Reset matching cars
      } else {
        console.error(
          "Invalid input. Make and at least one updated field are required."
        );
      }
    } catch (error) {
      console.error("Error updating cars:", error);
    }
  };

  return (
    <div className="update-many-form">
      <h2>Update Many Cars</h2>
      <div>
        <label htmlFor="make">Make:</label>
        <input type="text" id="make" value={make} onChange={handleMakeChange} />
      </div>
      {matchingCars.length > 0 && (
        <div>
          <h3>Matching Cars:</h3>
          <ul>
            {matchingCars.map((car) => (
              <li key={car._id}>
                <strong>Make:</strong> {car.make}, <strong>Model:</strong>{" "}
                {car.model}, <strong>Registration</strong>{" "}
                {car.registrationNumber}, <strong>Current Owner:</strong>{" "}
                {car.currentOwner}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <label htmlFor="updatedOwner">Updated Current Owner:</label>
        <input
          type="text"
          id="updatedOwner"
          name="currentOwner"
          value={updatedData.currentOwner}
          onChange={handleUpdatedDataChange}
        />
      </div>
      <button onClick={handleUpdateClick}>Update Cars</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UpdateManyForm;
