// // // import React, { useState, useEffect } from 'react';
// // // import Navbar from '../components/Navbar';
// // // import { FaPlus, FaTrash, FaPen, FaCheck, FaTimes } from 'react-icons/fa';
// // // import axios from 'axios';
// // // import './AddPlatform.css';

// // // const AddPlatform = () => {
// // //   const [platforms, setPlatforms] = useState([]);
// // //   const [formData, setFormData] = useState({
// // //     platformName: 'Codeforces',
// // //     handle: ''
// // //   });
// // //   const [editId, setEditId] = useState(null);
// // //   const [editHandle, setEditHandle] = useState('');
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [success, setSuccess] = useState(null);

// // //   const supportedPlatforms = [
// // //     'Codeforces',
// // //     'LeetCode',
// // //     'CodeChef',
// // //     'HackerRank',
// // //     'AtCoder',
// // //     'HackerEarth',
// // //     'GeeksForGeeks',
// // //     'CodingNinjas',
// // //     'CodeAcademy'
// // //   ];

// // //   // Platform logos/icons - in a real app, you would use actual icons
// // //   const platformIcons = {
// // //     'Codeforces': '🟣',
// // //     'LeetCode': '🟠',
// // //     'CodeChef': '🟤',
// // //     'HackerRank': '🟢',
// // //     'AtCoder': '🔵',
// // //     'HackerEarth': '🟡',
// // //     'GeeksForGeeks': '🟢',
// // //     'CodingNinjas': '🔴',
// // //     'CodeAcademy': '🔵'
// // //   };

// // //   useEffect(() => {
// // //     fetchPlatforms();
// // //   }, []);

// // //   const fetchPlatforms = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const token = localStorage.getItem('token');
      
// // //       if (!token) {
// // //         setError('Not authenticated. Please login first.');
// // //         setLoading(false);
// // //         return;
// // //       }
      
// // //       const config = {
// // //         headers: {
// // //           'x-auth-token': token
// // //         }
// // //       };
      
// // //       const res = await axios.get('http://localhost:5000/api/platform', config);
// // //       setPlatforms(res.data);
// // //       setLoading(false);
// // //     } catch (err) {
// // //       console.error('Error fetching platforms:', err);
// // //       setError('Failed to fetch platforms. Please try again.');
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleInputChange = (e) => {
// // //     setFormData({
// // //       ...formData,
// // //       [e.target.name]: e.target.value
// // //     });
// // //   };

// // //   const handleAddPlatform = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       setLoading(true);
// // //       const token = localStorage.getItem('token');
      
// // //       if (!token) {
// // //         setError('Not authenticated. Please login first.');
// // //         setLoading(false);
// // //         return;
// // //       }
      
// // //       const config = {
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'x-auth-token': token
// // //         }
// // //       };
      
// // //       axios.post('http://localhost:5000/api/platform', formData, {
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'x-auth-token': token
// // //         },
// // //         withCredentials: true
// // //       });
      
// // //       setSuccess(`${formData.platformName} handle added successfully!`);
// // //       setFormData({ ...formData, handle: '' });
// // //       fetchPlatforms();
      
// // //       // Clear success message after 3 seconds
// // //       setTimeout(() => setSuccess(null), 3000);
// // //     } catch (err) {
// // //       console.error('Error adding platform:', err);
// // //       setError(err.response?.data?.msg || 'Failed to add platform. Please try again.');
      
// // //       // Clear error message after 3 seconds
// // //       setTimeout(() => setError(null), 3000);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDeletePlatform = async (id) => {
// // //     try {
// // //       const token = localStorage.getItem('token');
      
// // //       if (!token) {
// // //         setError('Not authenticated. Please login first.');
// // //         return;
// // //       }
      
// // //       const config = {
// // //         headers: {
// // //           'x-auth-token': token
// // //         }
// // //       };
      
// // //       await axios.delete(`http://localhost:5000/api/platform/${id}`, config);
// // //       setPlatforms(platforms.filter(platform => platform._id !== id));
// // //       setSuccess('Platform removed successfully!');
      
// // //       // Clear success message after 3 seconds
// // //       setTimeout(() => setSuccess(null), 3000);
// // //     } catch (err) {
// // //       console.error('Error deleting platform:', err);
// // //       setError(err.response?.data?.msg || 'Failed to delete platform. Please try again.');
      
// // //       // Clear error message after 3 seconds
// // //       setTimeout(() => setError(null), 3000);
// // //     }
// // //   };

// // //   const handleEditClick = (platform) => {
// // //     setEditId(platform._id);
// // //     setEditHandle(platform.handle);
// // //   };

// // //   const handleCancelEdit = () => {
// // //     setEditId(null);
// // //     setEditHandle('');
// // //   };

// // //   const handleUpdatePlatform = async (id) => {
// // //     try {
// // //       const token = localStorage.getItem('token');
      
// // //       if (!token) {
// // //         setError('Not authenticated. Please login first.');
// // //         return;
// // //       }
      
// // //       const config = {
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'x-auth-token': token
// // //         }
// // //       };
      
// // //       const res = await axios.put(
// // //         `http://localhost:5000/api/platform/${id}`,
// // //         { handle: editHandle },
// // //         config
// // //       );
      
// // //       setPlatforms(
// // //         platforms.map(platform => (platform._id === id ? res.data : platform))
// // //       );
      
// // //       setEditId(null);
// // //       setEditHandle('');
// // //       setSuccess('Platform handle updated successfully!');
      
// // //       // Clear success message after 3 seconds
// // //       setTimeout(() => setSuccess(null), 3000);
// // //     } catch (err) {
// // //       console.error('Error updating platform:', err);
// // //       setError(err.response?.data?.msg || 'Failed to update platform. Please try again.');
      
// // //       // Clear error message after 3 seconds
// // //       setTimeout(() => setError(null), 3000);
// // //     }
// // //   };

// // //   return (
// // //     <div className="add-platform-container">
// // //       <Navbar />
      
// // //       <div className="platform-content">
// // //         <div className="platform-header">
// // //           <h1>Manage Your Coding Platforms</h1>
// // //           <p>Add your handles from various coding platforms to track your progress</p>
// // //         </div>

// // //         {error && (
// // //           <div className="alert alert-error">
// // //             <FaTimes className="alert-icon" />
// // //             {error}
// // //           </div>
// // //         )}

// // //         {success && (
// // //           <div className="alert alert-success">
// // //             <FaCheck className="alert-icon" />
// // //             {success}
// // //           </div>
// // //         )}

// // //         <div className="platform-section">
// // //           <div className="platform-form-container">
// // //             <h2>Add New Platform</h2>
// // //             <form onSubmit={handleAddPlatform} className="platform-form">
// // //               <div className="form-group">
// // //                 <label htmlFor="platformName">Platform</label>
// // //                 <select
// // //                   id="platformName"
// // //                   name="platformName"
// // //                   value={formData.platformName}
// // //                   onChange={handleInputChange}
// // //                   required
// // //                 >
// // //                   {supportedPlatforms.map(platform => (
// // //                     <option key={platform} value={platform}>
// // //                       {platformIcons[platform]} {platform}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </div>
              
// // //               <div className="form-group">
// // //                 <label htmlFor="handle">Handle / Username</label>
// // //                 <input
// // //                   type="text"
// // //                   id="handle"
// // //                   name="handle"
// // //                   value={formData.handle}
// // //                   onChange={handleInputChange}
// // //                   placeholder="Your username on this platform"
// // //                   required
// // //                 />
// // //               </div>
              
// // //               <button type="submit" className="btn-add-platform" disabled={loading}>
// // //                 <FaPlus /> Add Platform
// // //               </button>
// // //             </form>
// // //           </div>

// // //           <div className="platforms-list-container">
// // //             <h2>Your Platforms</h2>
// // //             {loading ? (
// // //               <div className="loading-spinner-container">
// // //                 <div className="loading-spinner"></div>
// // //                 <p>Loading your platforms...</p>
// // //               </div>
// // //             ) : platforms.length === 0 ? (
// // //               <div className="empty-platforms">
// // //                 <div className="empty-icon">📋</div>
// // //                 <h3>No platforms added yet</h3>
// // //                 <p>Add your first platform handle to get started</p>
// // //               </div>
// // //             ) : (
// // //               <div className="platforms-list">
// // //                 {platforms.map(platform => (
// // //                   <div key={platform._id} className="platform-card">
// // //                     <div className="platform-info">
// // //                       <div className="platform-icon">{platformIcons[platform.platformName]}</div>
// // //                       <div className="platform-details">
// // //                         <h3>{platform.platformName}</h3>
// // //                         {editId === platform._id ? (
// // //                           <div className="edit-handle-form">
// // //                             <input
// // //                               type="text"
// // //                               value={editHandle}
// // //                               onChange={(e) => setEditHandle(e.target.value)}
// // //                               className="edit-handle-input"
// // //                             />
// // //                             <div className="edit-actions">
// // //                               <button 
// // //                                 onClick={() => handleUpdatePlatform(platform._id)}
// // //                                 className="btn-save"
// // //                               >
// // //                                 <FaCheck />
// // //                               </button>
// // //                               <button 
// // //                                 onClick={handleCancelEdit}
// // //                                 className="btn-cancel"
// // //                               >
// // //                                 <FaTimes />
// // //                               </button>
// // //                             </div>
// // //                           </div>
// // //                         ) : (
// // //                           <p className="platform-handle">{platform.handle}</p>
// // //                         )}
// // //                         {platform.rating && (
// // //                           <span className="platform-rating">Rating: {platform.rating}</span>
// // //                         )}
// // //                       </div>
// // //                     </div>
// // //                     {editId !== platform._id && (
// // //                       <div className="platform-actions">
// // //                         <button 
// // //                           onClick={() => handleEditClick(platform)}
// // //                           className="btn-edit"
// // //                           title="Edit Handle"
// // //                         >
// // //                           <FaPen />
// // //                         </button>
// // //                         <button 
// // //                           onClick={() => handleDeletePlatform(platform._id)}
// // //                           className="btn-delete"
// // //                           title="Delete Platform"
// // //                         >
// // //                           <FaTrash />
// // //                         </button>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AddPlatform;















// // import React, { useState, useEffect } from 'react';
// // import Navbar from '../components/Navbar';
// // import { FaPlus, FaTrash, FaPen, FaCheck, FaTimes } from 'react-icons/fa';
// // import axios from 'axios';
// // import './AddPlatform.css';

// // const AddPlatform = () => {
// //   const [platforms, setPlatforms] = useState([]);
// //   const [formData, setFormData] = useState({
// //     platformName: 'Codeforces',
// //     handle: ''
// //   });
// //   const [editId, setEditId] = useState(null);
// //   const [editHandle, setEditHandle] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(null);

// //   const supportedPlatforms = [
// //     'Codeforces',
// //     'LeetCode',
// //     'CodeChef',
// //     'HackerRank',
// //     'AtCoder',
// //     'HackerEarth',
// //     'GeeksForGeeks',
// //     'CodingNinjas',
// //     'CodeAcademy'
// //   ];

// //   // Platform logos/icons
// //   const platformIcons = {
// //     'Codeforces': '🟣',
// //     'LeetCode': '🟠',
// //     'CodeChef': '🟤',
// //     'HackerRank': '🟢',
// //     'AtCoder': '🔵',
// //     'HackerEarth': '🟡',
// //     'GeeksForGeeks': '🟢',
// //     'CodingNinjas': '🔴',
// //     'CodeAcademy': '🔵'
// //   };

// //   useEffect(() => {
// //     fetchPlatforms();
// //   }, []);

// //   // Configure axios defaults for all requests
// //   const getAuthConfig = () => {
// //     const token = localStorage.getItem('token');
// //     return {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'x-auth-token': token
// //       },
// //       withCredentials: true
// //     };
// //   };

// //   const fetchPlatforms = async () => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem('token');
      
// //       if (!token) {
// //         setError('Not authenticated. Please login first.');
// //         setLoading(false);
// //         return;
// //       }
      
// //       const response = await axios.get('http://localhost:5000/api/platform', getAuthConfig());
      
// //       // Check if the response has the data in platforms property or directly
// //       const platformsData = response.data.platforms || response.data;
// //       setPlatforms(Array.isArray(platformsData) ? platformsData : []);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error('Error fetching platforms:', err);
// //       setError(err.response?.data?.error || 'Failed to fetch platforms. Please try again.');
// //       setLoading(false);
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleAddPlatform = async (e) => {
// //     e.preventDefault();
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem('token');
      
// //       if (!token) {
// //         setError('Not authenticated. Please login first.');
// //         setLoading(false);
// //         return;
// //       }
      
// //       await axios.post('http://localhost:5000/api/platform', formData, getAuthConfig());
      
// //       setSuccess(`${formData.platformName} handle added successfully!`);
// //       setFormData({ ...formData, handle: '' });
// //       fetchPlatforms();
      
// //       // Clear success message after 3 seconds
// //       setTimeout(() => setSuccess(null), 3000);
// //     } catch (err) {
// //       console.error('Error adding platform:', err);
// //       setError(err.response?.data?.error || 'Failed to add platform. Please try again.');
      
// //       // Clear error message after 3 seconds
// //       setTimeout(() => setError(null), 3000);
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeletePlatform = async (id) => {
// //     try {
// //       const token = localStorage.getItem('token');
      
// //       if (!token) {
// //         setError('Not authenticated. Please login first.');
// //         return;
// //       }
      
// //       await axios.delete(`http://localhost:5000/api/platform/${id}`, getAuthConfig());
// //       setPlatforms(platforms.filter(platform => platform._id !== id));
// //       setSuccess('Platform removed successfully!');
      
// //       // Clear success message after 3 seconds
// //       setTimeout(() => setSuccess(null), 3000);
// //     } catch (err) {
// //       console.error('Error deleting platform:', err);
// //       setError(err.response?.data?.error || 'Failed to delete platform. Please try again.');
      
// //       // Clear error message after 3 seconds
// //       setTimeout(() => setError(null), 3000);
// //     }
// //   };

// //   const handleEditClick = (platform) => {
// //     setEditId(platform._id);
// //     setEditHandle(platform.handle);
// //   };

// //   const handleCancelEdit = () => {
// //     setEditId(null);
// //     setEditHandle('');
// //   };

// //   const handleUpdatePlatform = async (id) => {
// //     try {
// //       const token = localStorage.getItem('token');
      
// //       if (!token) {
// //         setError('Not authenticated. Please login first.');
// //         return;
// //       }
      
// //       const res = await axios.put(
// //         `http://localhost:5000/api/platform/${id}`,
// //         { handle: editHandle },
// //         getAuthConfig()
// //       );
      
// //       // Update platforms list with the updated platform
// //       const updatedPlatform = res.data.platform || res.data;
// //       setPlatforms(
// //         platforms.map(platform => (platform._id === id ? updatedPlatform : platform))
// //       );
      
// //       setEditId(null);
// //       setEditHandle('');
// //       setSuccess('Platform handle updated successfully!');
      
// //       // Clear success message after 3 seconds
// //       setTimeout(() => setSuccess(null), 3000);
// //     } catch (err) {
// //       console.error('Error updating platform:', err);
// //       setError(err.response?.data?.error || 'Failed to update platform. Please try again.');
      
// //       // Clear error message after 3 seconds
// //       setTimeout(() => setError(null), 3000);
// //     }
// //   };

// //   return (
// //     <div className="add-platform-container">
// //       <Navbar />
      
// //       <div className="platform-content">
// //         <div className="platform-header">
// //           <h1>Manage Your Coding Platforms</h1>
// //           <p>Add your handles from various coding platforms to track your progress</p>
// //         </div>

// //         {error && (
// //           <div className="alert alert-error">
// //             <FaTimes className="alert-icon" />
// //             {error}
// //           </div>
// //         )}

// //         {success && (
// //           <div className="alert alert-success">
// //             <FaCheck className="alert-icon" />
// //             {success}
// //           </div>
// //         )}

// //         <div className="platform-section">
// //           <div className="platform-form-container">
// //             <h2>Add New Platform</h2>
// //             <form onSubmit={handleAddPlatform} className="platform-form">
// //               <div className="form-group">
// //                 <label htmlFor="platformName">Platform</label>
// //                 <select
// //                   id="platformName"
// //                   name="platformName"
// //                   value={formData.platformName}
// //                   onChange={handleInputChange}
// //                   required
// //                 >
// //                   {supportedPlatforms.map(platform => (
// //                     <option key={platform} value={platform}>
// //                       {platformIcons[platform]} {platform}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
              
// //               <div className="form-group">
// //                 <label htmlFor="handle">Handle / Username</label>
// //                 <input
// //                   type="text"
// //                   id="handle"
// //                   name="handle"
// //                   value={formData.handle}
// //                   onChange={handleInputChange}
// //                   placeholder="Your username on this platform"
// //                   required
// //                 />
// //               </div>
              
// //               <button type="submit" className="btn-add-platform" disabled={loading}>
// //                 <FaPlus /> Add Platform
// //               </button>
// //             </form>
// //           </div>

// //           <div className="platforms-list-container">
// //             <h2>Your Platforms</h2>
// //             {loading ? (
// //               <div className="loading-spinner-container">
// //                 <div className="loading-spinner"></div>
// //                 <p>Loading your platforms...</p>
// //               </div>
// //             ) : platforms.length === 0 ? (
// //               <div className="empty-platforms">
// //                 <div className="empty-icon">📋</div>
// //                 <h3>No platforms added yet</h3>
// //                 <p>Add your first platform handle to get started</p>
// //               </div>
// //             ) : (
// //               <div className="platforms-list">
// //                 {platforms.map(platform => (
// //                   <div key={platform._id} className="platform-card">
// //                     <div className="platform-info">
// //                       <div className="platform-icon">{platformIcons[platform.platformName]}</div>
// //                       <div className="platform-details">
// //                         <h3>{platform.platformName}</h3>
// //                         {editId === platform._id ? (
// //                           <div className="edit-handle-form">
// //                             <input
// //                               type="text"
// //                               value={editHandle}
// //                               onChange={(e) => setEditHandle(e.target.value)}
// //                               className="edit-handle-input"
// //                             />
// //                             <div className="edit-actions">
// //                               <button 
// //                                 onClick={() => handleUpdatePlatform(platform._id)}
// //                                 className="btn-save"
// //                               >
// //                                 <FaCheck />
// //                               </button>
// //                               <button 
// //                                 onClick={handleCancelEdit}
// //                                 className="btn-cancel"
// //                               >
// //                                 <FaTimes />
// //                               </button>
// //                             </div>
// //                           </div>
// //                         ) : (
// //                           <p className="platform-handle">{platform.handle}</p>
// //                         )}
// //                         {platform.rating && (
// //                           <span className="platform-rating">Rating: {platform.rating}</span>
// //                         )}
// //                       </div>
// //                     </div>
// //                     {editId !== platform._id && (
// //                       <div className="platform-actions">
// //                         <button 
// //                           onClick={() => handleEditClick(platform)}
// //                           className="btn-edit"
// //                           title="Edit Handle"
// //                         >
// //                           <FaPen />
// //                         </button>
// //                         <button 
// //                           onClick={() => handleDeletePlatform(platform._id)}
// //                           className="btn-delete"
// //                           title="Delete Platform"
// //                         >
// //                           <FaTrash />
// //                         </button>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddPlatform;










// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { FaPlus, FaTrash, FaPen, FaCheck, FaTimes } from 'react-icons/fa';
// import axios from 'axios';
// import './AddPlatform.css';

// const AddPlatform = () => {
//   const [platforms, setPlatforms] = useState([]);
//   const [formData, setFormData] = useState({
//     platformName: 'Codeforces',
//     handle: ''
//   });
//   const [editId, setEditId] = useState(null);
//   const [editHandle, setEditHandle] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [tokenStatus, setTokenStatus] = useState(null);

//   const supportedPlatforms = [
//     'Codeforces',
//     'LeetCode',
//     'CodeChef',
//     'HackerRank',
//     'AtCoder',
//     'HackerEarth',
//     'GeeksForGeeks',
//     'CodingNinjas',
//     'CodeAcademy'
//   ];

//   // Platform logos/icons
//   const platformIcons = {
//     'Codeforces': '🟣',
//     'LeetCode': '🟠',
//     'CodeChef': '🟤',
//     'HackerRank': '🟢',
//     'AtCoder': '🔵',
//     'HackerEarth': '🟡',
//     'GeeksForGeeks': '🟢',
//     'CodingNinjas': '🔴',
//     'CodeAcademy': '🔵'
//   };

//   useEffect(() => {
//     checkAndRefreshToken();
//     fetchPlatforms();
//   }, []);

//   // Check token and display status for debugging
//   const checkAndRefreshToken = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setTokenStatus('No token found in localStorage');
//       return false;
//     }
    
//     // Display partial token for debugging
//     const partialToken = token.substring(0, 15) + '...';
//     setTokenStatus(`Token exists: ${partialToken}`);
//     return true;
//   };

//   // Configure axios defaults for all requests
//   const getAuthConfig = () => {
//     const token = localStorage.getItem('token');
    
//     // Log the token being used (remove in production)
//     console.log("Using token:", token ? `${token.substring(0, 15)}...` : "No token found");
    
//     return {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'x-auth-token': token
//       }
//     };
//   };

//   const fetchPlatforms = async () => {
//     try {
//       setLoading(true);
      
//       if (!checkAndRefreshToken()) {
//         setError('Not authenticated. Please login first.');
//         setLoading(false);
//         return;
//       }
      
//       // Log before making request
//       console.log("Fetching platforms with config:", getAuthConfig());
      
//       const response = await axios.get('http://localhost:5000/api/platform', getAuthConfig());
      
//       console.log("Platform response:", response.data);
      
//       // Handle different response formats
//       const platformsData = response.data.platforms || response.data;
//       setPlatforms(Array.isArray(platformsData) ? platformsData : []);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching platforms:', err);
      
//       // More detailed error logging
//       if (err.response) {
//         console.error('Response error data:', err.response.data);
//         console.error('Response error status:', err.response.status);
        
//         if (err.response.status === 401) {
//           setError('Authentication failed. Please try logging in again.');
//           localStorage.removeItem('token'); // Clear invalid token
//         } else {
//           setError(err.response.data?.error || 'Failed to fetch platforms. Please try again.');
//         }
//       } else if (err.request) {
//         console.error('Request error:', err.request);
//         setError('Network error. Please check your connection.');
//       } else {
//         setError('An unexpected error occurred.');
//       }
      
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleAddPlatform = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
      
//       if (!checkAndRefreshToken()) {
//         setError('Not authenticated. Please login first.');
//         setLoading(false);
//         return;
//       }
      
//       const response = await axios.post(
//         'http://localhost:5000/api/platform', 
//         formData, 
//         getAuthConfig()
//       );
      
//       console.log("Add platform response:", response.data);
      
//       setSuccess(`${formData.platformName} handle added successfully!`);
//       setFormData({ ...formData, handle: '' });
//       fetchPlatforms();
      
//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       console.error('Error adding platform:', err);
//       handleApiError(err, 'Failed to add platform');
//       setLoading(false);
//     }
//   };

//   const handleDeletePlatform = async (id) => {
//     try {
//       if (!checkAndRefreshToken()) {
//         setError('Not authenticated. Please login first.');
//         return;
//       }
      
//       await axios.delete(`http://localhost:5000/api/platform/${id}`, getAuthConfig());
//       setPlatforms(platforms.filter(platform => platform._id !== id));
//       setSuccess('Platform removed successfully!');
      
//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       console.error('Error deleting platform:', err);
//       handleApiError(err, 'Failed to delete platform');
//     }
//   };

//   const handleEditClick = (platform) => {
//     setEditId(platform._id);
//     setEditHandle(platform.handle);
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//     setEditHandle('');
//   };

//   const handleUpdatePlatform = async (id) => {
//     try {
//       if (!checkAndRefreshToken()) {
//         setError('Not authenticated. Please login first.');
//         return;
//       }
      
//       const res = await axios.put(
//         `http://localhost:5000/api/platform/${id}`,
//         { handle: editHandle },
//         getAuthConfig()
//       );
      
//       // Update platforms list with the updated platform
//       const updatedPlatform = res.data.platform || res.data;
//       setPlatforms(
//         platforms.map(platform => (platform._id === id ? updatedPlatform : platform))
//       );
      
//       setEditId(null);
//       setEditHandle('');
//       setSuccess('Platform handle updated successfully!');
      
//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       console.error('Error updating platform:', err);
//       handleApiError(err, 'Failed to update platform');
//     }
//   };

//   // Centralized error handling
//   const handleApiError = (err, defaultMessage) => {
//     if (err.response) {
//       if (err.response.status === 401) {
//         setError('Authentication failed. Please try logging in again.');
//         localStorage.removeItem('token'); // Clear invalid token
//       } else {
//         setError(err.response.data?.error || defaultMessage);
//       }
//     } else if (err.request) {
//       setError('Network error. Please check your connection.');
//     } else {
//       setError(defaultMessage);
//     }
    
//     // Clear error message after 3 seconds
//     setTimeout(() => setError(null), 3000);
//   };

//   return (
//     <div className="add-platform-container">
//       <Navbar />
      
//       <div className="platform-content">
//         <div className="platform-header">
//           <h1>Manage Your Coding Platforms</h1>
//           <p>Add your handles from various coding platforms to track your progress</p>
//         </div>

//         {/* Debug token info - remove in production */}
//         {tokenStatus && (
//           <div className="debug-info" style={{background: '#f0f0f0', padding: '10px', margin: '10px 0', borderRadius: '5px'}}>
//             <strong>Debug:</strong> {tokenStatus}
//           </div>
//         )}

//         {error && (
//           <div className="alert alert-error">
//             <FaTimes className="alert-icon" />
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="alert alert-success">
//             <FaCheck className="alert-icon" />
//             {success}
//           </div>
//         )}

//         <div className="platform-section">
//           <div className="platform-form-container">
//             <h2>Add New Platform</h2>
//             <form onSubmit={handleAddPlatform} className="platform-form">
//               <div className="form-group">
//                 <label htmlFor="platformName">Platform</label>
//                 <select
//                   id="platformName"
//                   name="platformName"
//                   value={formData.platformName}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   {supportedPlatforms.map(platform => (
//                     <option key={platform} value={platform}>
//                       {platformIcons[platform]} {platform}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="handle">Handle / Username</label>
//                 <input
//                   type="text"
//                   id="handle"
//                   name="handle"
//                   value={formData.handle}
//                   onChange={handleInputChange}
//                   placeholder="Your username on this platform"
//                   required
//                 />
//               </div>
              
//               <button type="submit" className="btn-add-platform" disabled={loading}>
//                 <FaPlus /> Add Platform
//               </button>
//             </form>
//           </div>

//           <div className="platforms-list-container">
//             <h2>Your Platforms</h2>
//             {loading ? (
//               <div className="loading-spinner-container">
//                 <div className="loading-spinner"></div>
//                 <p>Loading your platforms...</p>
//               </div>
//             ) : platforms.length === 0 ? (
//               <div className="empty-platforms">
//                 <div className="empty-icon">📋</div>
//                 <h3>No platforms added yet</h3>
//                 <p>Add your first platform handle to get started</p>
//               </div>
//             ) : (
//               <div className="platforms-list">
//                 {platforms.map(platform => (
//                   <div key={platform._id} className="platform-card">
//                     <div className="platform-info">
//                       <div className="platform-icon">{platformIcons[platform.platformName]}</div>
//                       <div className="platform-details">
//                         <h3>{platform.platformName}</h3>
//                         {editId === platform._id ? (
//                           <div className="edit-handle-form">
//                             <input
//                               type="text"
//                               value={editHandle}
//                               onChange={(e) => setEditHandle(e.target.value)}
//                               className="edit-handle-input"
//                             />
//                             <div className="edit-actions">
//                               <button 
//                                 onClick={() => handleUpdatePlatform(platform._id)}
//                                 className="btn-save"
//                               >
//                                 <FaCheck />
//                               </button>
//                               <button 
//                                 onClick={handleCancelEdit}
//                                 className="btn-cancel"
//                               >
//                                 <FaTimes />
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           <p className="platform-handle">{platform.handle}</p>
//                         )}
//                         {platform.rating && (
//                           <span className="platform-rating">Rating: {platform.rating}</span>
//                         )}
//                       </div>
//                     </div>
//                     {editId !== platform._id && (
//                       <div className="platform-actions">
//                         <button 
//                           onClick={() => handleEditClick(platform)}
//                           className="btn-edit"
//                           title="Edit Handle"
//                         >
//                           <FaPen />
//                         </button>
//                         <button 
//                           onClick={() => handleDeletePlatform(platform._id)}
//                           className="btn-delete"
//                           title="Delete Platform"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddPlatform;








import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaPlus, FaTrash, FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './AddPlatform.css';

const AddPlatform = () => {
  const [platforms, setPlatforms] = useState([]);
  const [formData, setFormData] = useState({
    platformName: 'Codeforces',
    handle: ''
  });
  const [editId, setEditId] = useState(null);
  const [editHandle, setEditHandle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const supportedPlatforms = [
    'Codeforces',
    'LeetCode',
    'CodeChef',
    'HackerRank',
    'AtCoder',
    'HackerEarth',
    'GeeksForGeeks',
    'CodingNinjas',
    'CodeAcademy'
  ];

  const platformIcons = {
    'Codeforces': '🟣',
    'LeetCode': '🟠',
    'CodeChef': '🟤',
    'HackerRank': '🟢',
    'AtCoder': '🔵',
    'HackerEarth': '🟡',
    'GeeksForGeeks': '🟢',
    'CodingNinjas': '🔴',
    'CodeAcademy': '🔵'
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };
  };

  const fetchPlatforms = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/platform', getAuthConfig());
      setPlatforms(response.data.platforms || response.data);
      setLoading(false);
    } catch (err) {
      handleApiError(err, 'Failed to fetch platforms');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPlatform = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/platform', formData, getAuthConfig());
      setSuccess(`${formData.platformName} handle added successfully!`);
      setFormData({ ...formData, handle: '' });
      fetchPlatforms();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      handleApiError(err, 'Failed to add platform');
      setLoading(false);
    }
  };

  const handleDeletePlatform = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/platform/${id}`, getAuthConfig());
      setPlatforms(platforms.filter(platform => platform._id !== id));
      setSuccess('Platform removed successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      handleApiError(err, 'Failed to delete platform');
    }
  };

  const handleEditClick = (platform) => {
    setEditId(platform._id);
    setEditHandle(platform.handle);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditHandle('');
  };

  const handleUpdatePlatform = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/platform/${id}`,
        { handle: editHandle },
        getAuthConfig()
      );
      
      setPlatforms(
        platforms.map(platform =>
          platform._id === id ? res.data.platform : platform
        )
      );
      
      setEditId(null);
      setEditHandle('');
      setSuccess('Platform handle updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      handleApiError(err, 'Failed to update platform');
    }
  };

  const handleApiError = (err, defaultMessage) => {
    if (err.response) {
      if (err.response.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
      } else {
        setError(err.response.data?.error || defaultMessage);
      }
    } else {
      setError(defaultMessage);
    }
    setTimeout(() => setError(null), 3000);
  };

  return (
    <div className="add-platform-container">
      <Navbar />
      
      <div className="platform-content">
        <div className="platform-header">
          <h1>Manage Your Coding Platforms</h1>
          <p>Add your handles from various coding platforms to track your progress</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <FaTimes className="alert-icon" />
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <FaCheck className="alert-icon" />
            {success}
          </div>
        )}

        <div className="platform-section">
          <div className="platform-form-container">
            <h2>Add New Platform</h2>
            <form onSubmit={handleAddPlatform} className="platform-form">
              <div className="form-group">
                <label htmlFor="platformName">Platform</label>
                <select
                  id="platformName"
                  name="platformName"
                  value={formData.platformName}
                  onChange={handleInputChange}
                  required
                >
                  {supportedPlatforms.map(platform => (
                    <option key={platform} value={platform}>
                      {platformIcons[platform]} {platform}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="handle">Handle / Username</label>
                <input
                  type="text"
                  id="handle"
                  name="handle"
                  value={formData.handle}
                  onChange={handleInputChange}
                  placeholder="Your username on this platform"
                  required
                />
              </div>
              
              <button type="submit" className="btn-add-platform" disabled={loading}>
                <FaPlus /> Add Platform
              </button>
            </form>
          </div>

          <div className="platforms-list-container">
            <h2>Your Platforms</h2>
            {loading ? (
              <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
                <p>Loading your platforms...</p>
              </div>
            ) : platforms.length === 0 ? (
              <div className="empty-platforms">
                <div className="empty-icon">📋</div>
                <h3>No platforms added yet</h3>
                <p>Add your first platform handle to get started</p>
              </div>
            ) : (
              <div className="platforms-list">
                {platforms.map(platform => (
                  <div key={platform._id} className="platform-card">
                    <div className="platform-info">
                      <div className="platform-icon">{platformIcons[platform.platformName]}</div>
                      <div className="platform-details">
                        <h3>{platform.platformName}</h3>
                        {editId === platform._id ? (
                          <div className="edit-handle-form">
                            <input
                              type="text"
                              value={editHandle}
                              onChange={(e) => setEditHandle(e.target.value)}
                              className="edit-handle-input"
                            />
                            <div className="edit-actions">
                              <button 
                                onClick={() => handleUpdatePlatform(platform._id)}
                                className="btn-save"
                              >
                                <FaCheck />
                              </button>
                              <button 
                                onClick={handleCancelEdit}
                                className="btn-cancel"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="platform-handle">{platform.handle}</p>
                        )}
                      </div>
                    </div>
                    {editId !== platform._id && (
                      <div className="platform-actions">
                        <button 
                          onClick={() => handleEditClick(platform)}
                          className="btn-edit"
                          title="Edit Handle"
                        >
                          <FaPen />
                        </button>
                        <button 
                          onClick={() => handleDeletePlatform(platform._id)}
                          className="btn-delete"
                          title="Delete Platform"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlatform;