import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  setPage,
  toggleFavorite,
  deleteUser,
  createUser,
} from "../store/modules/usersSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { paginatedUsers, currentPage, totalPages, loading, error, favorites } =
    useSelector((state) => state.users);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: { street: "", suite: "", city: "", zipcode: "" },
    company: { name: "" },
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (e, key, nestedKey) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [nestedKey || name]: value,
      },
    }));
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.id));
    }
  };

  const handleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const handleDeleteConfirm = async () => {
    for (const userId of selectedUsers) {
      await dispatch(deleteUser(userId));
    }
    setSelectedUsers([]);
    setShowDeleteModal(false);
  };

  const handleCreateUser = async () => {
    await dispatch(createUser(newUser));
    setNewUser({
      name: "",
      username: "",
      email: "",
      phone: "",
      address: { street: "", suite: "", city: "", zipcode: "" },
      company: { name: "" },
    });
    setShowCreateModal(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
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

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="mb-3 text-end">
          <button
            className="btn btn-success"
            onClick={() => setShowCreateModal(true)} // Open the create user modal
          >
            + Create User
          </button>
        </div>
        <div className="card shadow-lg">
          <div className="card-header text-center bg-primary text-white">
            <h2 className="mb-0">Dashboard</h2>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover text-center align-middle">
              <thead className="table-primary">
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedUsers.length === paginatedUsers.length &&
                        selectedUsers.length > 0
                      }
                      className="form-check-input"
                    />
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Address</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Favorite</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="form-check-input"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      {user.address.street}, {user.address.suite},{" "}
                      {user.address.city}, {user.address.zipcode}
                    </td>
                    <td>{user.company.name}</td>
                    <td>
                      <button
                        onClick={() => handleFavorite(user.id)}
                        className={`btn btn-sm ${
                          favorites.includes(user.id)
                            ? "btn-warning"
                            : "btn-outline-secondary"
                        }`}
                      >
                        {favorites.includes(user.id) ? "★" : "☆"}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => navigate(`/details/${user.id}`)}
                        className="btn btn-sm btn-primary"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <button
              onClick={() => setShowDeleteModal(true)} // Open delete confirmation modal
              disabled={selectedUsers.length === 0}
              className={`btn btn-danger ${
                selectedUsers.length === 0 && "disabled"
              }`}
            >
              Delete Selected ({selectedUsers.length})
            </button>
            <div className="pagination d-flex gap-2 align-items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-outline-primary"
              >
                Previous
              </button>
              <span className="text-muted">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-outline-primary"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New User</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={newUser.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={newUser.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={newUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={newUser.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Street</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.address.street}
                      onChange={(e) =>
                        handleNestedInputChange(e, "address", "street")
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.address.city}
                      onChange={(e) =>
                        handleNestedInputChange(e, "address", "city")
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.address.zipcode}
                      onChange={(e) =>
                        handleNestedInputChange(e, "address", "zipcode")
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.company.name}
                      onChange={(e) =>
                        handleNestedInputChange(e, "company", "name")
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleCreateUser}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowDeleteModal(false)} // Close the modal
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the selected users?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)} // Cancel action
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default DashboardPage;
