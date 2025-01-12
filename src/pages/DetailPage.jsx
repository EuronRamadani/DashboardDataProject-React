import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserById,
  clearSelectedUser,
  updateUser,
} from "../store/modules/usersSlice";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedUser, loading, error } = useSelector((state) => state.users);

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUserById(id));
    return () => {
      dispatch(clearSelectedUser()); // Clear user on unmount
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser) {
      setEditedUser({ ...selectedUser }); // Initialize editable fields
    }
  }, [selectedUser]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (e, key, nestedKey) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        [nestedKey || name]: value,
      },
    }));
  };

  const handleSave = () => {
    dispatch(updateUser(editedUser));
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading user details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger text-center">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-warning text-center">User not found.</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h2>{isEditing ? "Edit User Details" : "User Details"}</h2>
        </div>
        <div className="card-body">
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name:</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
              />
            ) : (
              <p>{selectedUser.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email:</label>
            {isEditing ? (
              <input
                type="email"
                className="form-control"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            ) : (
              <p>{selectedUser.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone:</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
              />
            ) : (
              <p>{selectedUser.phone}</p>
            )}
          </div>

          {/* Website */}
          <div className="mb-3">
            <label className="form-label">Website:</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                name="website"
                value={editedUser.website}
                onChange={handleInputChange}
              />
            ) : (
              <p>{selectedUser.website}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address:</label>
            {isEditing ? (
              <>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Street"
                  value={editedUser.address.street}
                  onChange={(e) =>
                    handleNestedInputChange(e, "address", "street")
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Suite"
                  value={editedUser.address.suite}
                  onChange={(e) =>
                    handleNestedInputChange(e, "address", "suite")
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="City"
                  value={editedUser.address.city}
                  onChange={(e) =>
                    handleNestedInputChange(e, "address", "city")
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Zipcode"
                  value={editedUser.address.zipcode}
                  onChange={(e) =>
                    handleNestedInputChange(e, "address", "zipcode")
                  }
                />
              </>
            ) : (
              <p>
                {selectedUser.address.street}, {selectedUser.address.suite},{" "}
                {selectedUser.address.city}, {selectedUser.address.zipcode}
              </p>
            )}
          </div>

          {/* Company */}
          <div className="mb-3">
            <label className="form-label">Company:</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={editedUser.company.name}
                onChange={(e) => handleNestedInputChange(e, "company", "name")}
              />
            ) : (
              <p>{selectedUser.company.name}</p>
            )}
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
          {isEditing ? (
            <div>
              <button
                className="btn btn-danger me-2"
                onClick={handleEditToggle}
              >
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={handleEditToggle}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
