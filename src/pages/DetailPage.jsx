import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById, clearSelectedUser } from "../store/modules/usersSlice";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(id));
    return () => {
      dispatch(clearSelectedUser()); // Clear user on unmount
    };
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!selectedUser) {
    return <p>User not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="mb-2">
        <label className="block font-bold">Name:</label>
        <p>{selectedUser.name}</p>
      </div>
      <div className="mb-2">
        <label className="block font-bold">Email:</label>
        <p>{selectedUser.email}</p>
      </div>
      <div className="mb-2">
        <label className="block font-bold">Phone:</label>
        <p>{selectedUser.phone}</p>
      </div>
      <div className="mb-2">
        <label className="block font-bold">Website:</label>
        <p>{selectedUser.website}</p>
      </div>
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
