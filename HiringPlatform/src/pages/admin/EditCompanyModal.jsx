// // import React, { useState, useEffect } from 'react';
// // import Modal from 'react-modal';
// // import axios from 'axios';

// // const customStyles = {
// //   overlay: {
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //     zIndex: 9999,
// //   },
// //   content: {
// //     top: '50%',
// //     left: '50%',
// //     right: 'auto',
// //     bottom: 'auto',
// //     marginRight: '-50%',
// //     transform: 'translate(-50%, -50%)',
// //     width: '400px',
// //     border: '1px solid #ccc',
// //     borderRadius: '5px',
// //     padding: '20px',
// //   },
// // };

// // function EditCompanyModal({ isOpen, closeModal, companyId, fetchCompanies }) {
// //   const [companyData, setCompanyData] = useState({
// //     companyName: '',
// //     location: '',
// //     email: '',
// //     phone: '',
// //     domain: '',
// //   });

// //   useEffect(() => {
// //     // Fetch company details when companyId changes
// //     const fetchCompanyDetails = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:3001/companies/${companyId}`);
// //         setCompanyData(response.data);
// //       } catch (error) {
// //         console.error('Error fetching company details:', error);
// //       }
// //     };

// //     if (isOpen && companyId) {
// //       fetchCompanyDetails();
// //     }
// //   }, [isOpen, companyId]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setCompanyData({ ...companyData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.put(`http://localhost:3001/companies/${companyId}`, companyData);
// //       fetchCompanies();
// //       closeModal();
// //     } catch (error) {
// //       console.error('Error updating company:', error);
// //     }
// //   };

// //   return (
// //     <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
// //       <h2>Edit Company</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div style={{ marginBottom: '15px' }}>
// //           <label style={{ display: 'block', marginBottom: '5px' }}>Company Name:</label>
// //           <input
// //             type="text"
// //             name="companyName"
// //             value={companyData.companyName || ''}
// //             onChange={handleInputChange}
// //             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: '15px' }}>
// //           <label style={{ display: 'block', marginBottom: '5px' }}>Location:</label>
// //           <input
// //             type="text"
// //             name="location"
// //             value={companyData.location || ''}
// //             onChange={handleInputChange}
// //             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
// //           />
// //         </div>
// //         <div style={{ marginBottom: '15px' }}>
// //           <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
// //           <input
// //             type="text"
// //             name="email"
// //             value={companyData.email || ''}
// //             onChange={handleInputChange}
// //             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
// //           />
// //         </div>
// //         <div style={{ marginBottom: '15px' }}>
// //           <label style={{ display: 'block', marginBottom: '5px' }}>Phone:</label>
// //           <input
// //             type="text"
// //             name="phone"
// //             value={companyData.phone || ''}
// //             onChange={handleInputChange}
// //             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
// //           />
// //         </div>
// //         <div style={{ marginBottom: '15px' }}>
// //           <label style={{ display: 'block', marginBottom: '5px' }}>Domain:</label>
// //           <input
// //             type="text"
// //             name="domain"
// //             value={companyData.domain || ''}
// //             onChange={handleInputChange}
// //             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
// //           />
// //         </div>
// //         <button type="submit" style={{ background: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update</button>
// //       </form>
// //     </Modal>
// //   );
// // }

// // export default EditCompanyModal;


// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';

// const customStyles = {
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: 9999,
//   },
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     width: '400px',
//     maxHeight: '80vh', // Set a maximum height
//     overflowY: 'auto', // Enable vertical scrolling if content exceeds maxHeight
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     padding: '20px',
//   },
// };

// function EditCompanyModal({ isOpen, closeModal, companyId, fetchCompanies }) {
//   const [companyData, setCompanyData] = useState({
//     companyName: '',
//     location: '',
//     email: '',
//     phone: '',
//     domain: '',
//   });

//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/companies/${companyId}`);
//         setCompanyData(response.data);
//       } catch (error) {
//         console.error('Error fetching company details:', error);
//       }
//     };

//     if (isOpen && companyId) {
//       fetchCompanyDetails();
//     }
//   }, [isOpen, companyId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCompanyData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:3001/companies/${companyId}`, companyData);
//       fetchCompanies();
//       closeModal();
//     } catch (error) {
//       console.error('Error updating company:', error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
//       <h2>Edit Company</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px' }}>Company Name:</label>
//           <input
//             type="text"
//             name="companyName"
//             value={companyData.companyName || ''}
//             onChange={handleInputChange}
//             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px' }}>Location:</label>
//           <input
//             type="text"
//             name="location"
//             value={companyData.location || ''}
//             onChange={handleInputChange}
//             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
//           />
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
//           <input
//             type="text"
//             name="email"
//             value={companyData.email || ''}
//             onChange={handleInputChange}
//             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
//           />
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px' }}>Phone:</label>
//           <input
//             type="text"
//             name="phone"
//             value={companyData.phone || ''}
//             onChange={handleInputChange}
//             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
//           />
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px' }}>Domain:</label>
//           <input
//             type="text"
//             name="domain"
//             value={companyData.domain || ''}
//             onChange={handleInputChange}
//             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
//           />
//         </div>
//         <button type="submit" style={{ background: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update</button>
//       </form>
//     </Modal>
//   );
// }

// export default EditCompanyModal;


import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    maxHeight: '80vh', // Set a maximum height
    overflowY: 'auto', // Enable vertical scrolling if content exceeds maxHeight
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
  },
};

function EditCompanyModal({ isOpen, closeModal, companyId, fetchCompanies }) {
  const [companyData, setCompanyData] = useState({
    companyName: '',
    location: '',
    email: '',
    phone: '',
    domain: '',
  });

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/companies/${companyId}`);
        setCompanyData(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    if (isOpen && companyId) {
      fetchCompanyDetails();
    }
  }, [isOpen, companyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/companies/${companyId}`, companyData);
      fetchCompanies();
      closeModal();
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h2>Edit Company</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={companyData.companyName}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Location:</label>
          <input
            type="text"
            name="location"
            value={companyData.location}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="text"
            name="email"
            value={companyData.email}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Phone:</label>
          <input
            type="text"
            name="phone"
            value={companyData.phone}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Domain:</label>
          <input
            type="text"
            name="domain"
            value={companyData.domain}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <button type="submit" style={{ background: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update</button>
      </form>
    </Modal>
  );
}

export default EditCompanyModal;
