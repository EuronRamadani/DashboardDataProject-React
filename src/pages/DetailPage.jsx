import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const navigate = useNavigate(); // For navigation
  const [user, setUser] = useState(null); // User data
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error handling
  const [editableUser, setEditableUser] = useState(null); // Local editable state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
        setEditableUser(data); // Create a local editable copy
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (field, value) => {
    setEditableUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved changes locally:", editableUser);
    alert("Changes saved locally!");
  };

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      {editableUser && (
        <div className="mb-4">
          <div className="mb-2">
            <label className="block font-bold">Name:</label>
            <input
              type="text"
              value={editableUser.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block font-bold">Email:</label>
            <input
              type="email"
              value={editableUser.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block font-bold">Phone:</label>
            <input
              type="text"
              value={editableUser.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block font-bold">Website:</label>
            <input
              type="text"
              value={editableUser.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      )}

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default DetailPage;
