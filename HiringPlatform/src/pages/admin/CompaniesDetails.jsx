import React, { useEffect, useState } from "react";
import axios from "axios";
import EditCompanyModal from "./EditCompanyModal"; // Import the modal component

function CompaniesDetails() {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [selectedCompanyId, setSelectedCompanyId] = useState(null); // State to track selected company for editing

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:3001/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleEdit = (companyId) => {
    // Open modal for editing
    setIsModalOpen(true);
    setSelectedCompanyId(companyId);
  };

  const closeModal = () => {
    // Close modal
    setIsModalOpen(false);
    setSelectedCompanyId(null);
  };

  const handleDelete = async (companyId) => {
    try {
      await axios.delete(`http://localhost:3001/companies/${companyId}`);
      // After successful deletion, fetch updated companies
      fetchCompanies();
      console.log("Company deleted successfully");
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Companies Details</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-300">Unique ID</th>
            <th className="p-3 border border-gray-300">Company Name</th>
            <th className="p-3 border border-gray-300">Location</th>
            <th className="p-3 border border-gray-300">Email</th>
            <th className="p-3 border border-gray-300">Phone</th>
            <th className="p-3 border border-gray-300">Domain</th>
            <th className="p-3 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id} className="bg-white">
              <td className="p-3 border border-gray-300">{company.uniqueId}</td>
              <td className="p-3 border border-gray-300">{company.companyName}</td>
              <td className="p-3 border border-gray-300">{company.location}</td>
              <td className="p-3 border border-gray-300">{company.email}</td>
              <td className="p-3 border border-gray-300">{company.phone}</td>
              <td className="p-3 border border-gray-300">{company.domain}</td>
              <td className="p-3 border border-gray-300">
                <button className="mr-2" onClick={() => handleEdit(company._id)}>Edit</button>|
                <button onClick={() => handleDelete(company._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render the EditCompanyModal component */}
      <EditCompanyModal isOpen={isModalOpen} closeModal={closeModal} companyId={selectedCompanyId} fetchCompanies={fetchCompanies} />
    </div>
  );
}

export default CompaniesDetails;
