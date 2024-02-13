import React, { useState } from "react";
import axios from "axios";
 
function TrainersFilterPage() {
  const [filterSkills, setFilterSkills] = useState("");
  const [filterChargePerDay, setFilterChargePerDay] = useState("");
  const [filteredTrainers, setFilteredTrainers] = useState([]);
 
  const handleFilter = async () => {
    try {
      const response = await axios.get("http://localhost:3001/trainers");
      let filteredData = response.data;
 
      // Filter by skills
      if (filterSkills) {
        filteredData = filteredData.filter((trainer) =>
          trainer.skills.toLowerCase().includes(filterSkills.toLowerCase())
        );
      }
 
      // Filter by charge per day
      if (filterChargePerDay) {
        filteredData = filteredData.filter(
          (trainer) => trainer.chargePerDay === filterChargePerDay
        );
      }
 
      setFilteredTrainers(filteredData);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };
 
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Filter Trainers</h2>
      <div className="mb-4">
        <label htmlFor="filterSkills" className="mr-2">
          Filter by Skills:
        </label>
        <input
          type="text"
          id="filterSkills"
          value={filterSkills}
          onChange={(e) => setFilterSkills(e.target.value)}
        />
        <label htmlFor="filterChargePerDay" className="ml-4 mr-2">
          Filter by Charge/Day:
        </label>
        <input
          type="text"
          id="filterChargePerDay"
          value={filterChargePerDay}
          onChange={(e) => setFilterChargePerDay(e.target.value)}
        />
        <button
          onClick={handleFilter}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Filter
        </button>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Filtered Trainers</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainers.map((trainer) => (
              <tr key={trainer._id} className="bg-white">
                <td className="p-3 border border-gray-300">{trainer.name}</td>
                <td className="p-3 border border-gray-300">{trainer.email}</td>
                <td className="p-3 border border-gray-300">
                  {trainer.contactNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
export default TrainersFilterPage;