import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BusinessRequestModal from "./BusinessRequestModal";

function calculatePricePerDay(request) {
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    const durationInMilliseconds = endDate - startDate;
    const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    const durationOfTraining = request.durationOfTraining;
    const trainingBudget = request.trainingBudget;
  
    if (durationOfTraining <= 0) {
      return "Invalid duration";
    }
  
    const pricePerDay = trainingBudget / (durationInDays * durationOfTraining);
    return isNaN(pricePerDay) ? "Invalid price" : pricePerDay.toFixed(2);
  }
  

function BusinessRequestsDetails() {
  const [businessRequests, setBusinessRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinessRequests();
  }, []);

  const fetchBusinessRequests = async () => {
    try {
      const response = await axios.get("http://localhost:3001/businessrequests");
      setBusinessRequests(response.data);
    } catch (error) {
      console.error("Error fetching business requests:", error);
    }
  };

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReject = async (businessId) => {
    try {
      // Send a DELETE request to the backend to delete the record
      await axios.delete(`http://localhost:3001/businessrequests/${businessId}`);
      
      // If the deletion is successful, update the state to remove the deleted record
      setBusinessRequests(prevBusinessRequests =>
        prevBusinessRequests.filter(request => request._id !== businessId)
      );
      
      console.log("Business request rejected successfully");
    } catch (error) {
      console.error("Error rejecting business request:", error);
    }
  };
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = businessRequests.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Business Requests Details</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-300">Batch Name</th>
            <th className="p-3 border border-gray-300">Technology</th>
            <th className="p-3 border border-gray-300">Start Date</th>
            <th className="p-3 border border-gray-300">End Date</th>
            <th className="p-3 border border-gray-300">Training Budget</th>
            <th className="p-3 border border-gray-300">Price Per Day</th>
            <th className="p-3 border border-gray-300">Company Name</th>
            <th className="p-3 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((request) => (
            <tr key={request._id} className="bg-white">
              <td className="p-3 border border-gray-300">{request.batchName}</td>
              <td className="p-3 border border-gray-300">{request.technology}</td>
              <td className="p-3 border border-gray-300">{request.startDate}</td>
              <td className="p-3 border border-gray-300">{request.endDate}</td>
              <td className="p-3 border border-gray-300">{request.trainingBudget}</td>
              <td className="p-3 border border-gray-300">{calculatePricePerDay(request)}</td>
              <td className="p-3 border border-gray-300">{typeof request.companyId === 'object' ? request.companyId.companyName : request.companyId}</td>
              <td className="p-3 border border-gray-300">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                  onClick={() => handleOpenModal(request)}
                >
                  Submit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleReject(request._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= businessRequests.length}
        >
          Next
        </button>
      </div>

      {/* Render the modal */}
      {isModalOpen && (
        <BusinessRequestModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          request={selectedRequest}
        />
      )}
    </div>
  );
}

export default BusinessRequestsDetails;
