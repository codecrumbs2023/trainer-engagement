import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTrainerModal from "./EditTrainerModal"; // Import the modal component

function TrainersDetails() {
  const [trainers, setTrainers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/trainers");
      setTrainers(response.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/trainers/${id}`);
      setTrainers(trainers.filter((trainer) => trainer._id !== id));
      console.log("Trainer deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  const handleEdit = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Trainers Details</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-300">Username</th>
            <th className="p-3 border border-gray-300">Name</th>
            <th className="p-3 border border-gray-300">Email</th>
            <th className="p-3 border border-gray-300">Contact Number</th>
            <th className="p-3 border border-gray-300">Skills</th>
            <th className="p-3 border border-gray-300">Address</th>
            <th className="p-3 border border-gray-300">Charge/day</th>
            <th className="p-3 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer._id} className="bg-white">
              <td className="p-3 border border-gray-300">{trainer.username}</td>
              <td className="p-3 border border-gray-300">{trainer.name}</td>
              <td className="p-3 border border-gray-300">{trainer.email}</td>
              <td className="p-3 border border-gray-300">{trainer.contactNumber}</td>
              <td className="p-3 border border-gray-300">{trainer.skills}</td>
              <td className="p-3 border border-gray-300">{trainer.address}</td>
              <td className="p-3 border border-gray-300">{trainer.chargePerDay}</td>
              <td className="p-3 border border-gray-300">
                <button onClick={() => handleEdit(trainer)}>Edit</button> |
                <button onClick={() => handleDelete(trainer._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Edit Trainer Modal */}
      <EditTrainerModal isOpen={isModalOpen} closeModal={closeModal} trainer={selectedTrainer} fetchTrainers={fetchTrainers} />
    </div>
  );
}

export default TrainersDetails;
