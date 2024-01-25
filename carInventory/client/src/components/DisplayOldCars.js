import React, { useState } from "react";

const DisplayOldCars = () => {
  const [oldCars, setOldCars] = useState([]);
  const [showOldCars, setShowOldCars] = useState(false);

  const handleClick = async (make) => {
    try {
      if (showOldCars) {
        setOldCars([]);
      } else {
        const response = await fetch(`/api/old-cars?make=${make}`); // Adjust the endpoint as needed
        const data = await response.json();
        setOldCars(data);
      }
      setShowOldCars(!showOldCars);
    } catch (error) {
      console.error("Error fetching old cars:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "rgb(230, 228, 129)",
        }}
      >
        {showOldCars ? "Hide Old Cars" : "Display Old Cars"}
      </button>
      {showOldCars && oldCars.length > 0 && (
        <div>
          <h2>Old Cars</h2>
          <ul>
            {oldCars.map((car, index) => (
              <li key={index}>
                {car.make} - {car.model} - {car.registrationNumber} -{" "}
                {car.currentOwner}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DisplayOldCars;
