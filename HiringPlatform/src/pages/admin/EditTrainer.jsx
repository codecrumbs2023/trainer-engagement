// EditTrainer.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditTrainer() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchTrainerDetails();
  }, [id]);

  const fetchTrainerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/trainers/${id}`);
      setTrainer(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching trainer details:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/trainers/${id}`, formData);
      // Redirect or show a success message
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
  };

  return (
    <div>
      <h2>Edit Trainer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        </label>
        {/* Add other input fields for trainer details */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditTrainer;