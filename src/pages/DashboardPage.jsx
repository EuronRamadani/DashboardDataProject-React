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
import CreateUserModal from "../components/modals/CreateUserModal";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { paginatedUsers, currentPage, totalPages, loading, error, favorites } =
    useSelector((state) => state.users);
  const [sortBy, setSortBy] = useState("");
  const [filterText, setFilterText] = useState("");

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

  const handleFilterChange = (e) => {
    setFilterText(e.target.value.toLowerCase());
  };

  const handleSortChange = (column) => {
    setSortBy(column);
  };

  const filteredAndSortedUsers = [...paginatedUsers]
    .filter(
      (user) =>
        user.name.toLowerCase().includes(filterText) ||
        user.username.toLowerCase().includes(filterText)
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

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
    toast.success("User(s) deleted successfully!");
    setSelectedUsers([]);
    setShowDeleteModal(false);
  };

  const handleCreateUser = async () => {
    await dispatch(createUser(newUser));
    toast.success("User added successfully!");
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
    toast.error("Error fetching data!");
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
      <div className="container mt-4 ">
        <div className="mb-3 text-end">
          <button
            className="btn btn-success"
            onClick={() => setShowCreateModal(true)}
          >
            + Create User
          </button>
        </div>
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <div className="row align-items-center g-3">
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name or username..."
                  value={filterText}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
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
                  <th
                    scope="col"
                    onClick={() => handleSortChange("name")}
                    className="sortable"
                  >
                    Name
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                      />
                    </svg>
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSortChange("username")}
                    className="sortable "
                  >
                    <div className="w-100 d-flex align-items-center">
                      Username
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                        />
                      </svg>
                    </div>
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSortChange("email")}
                    className="sortable"
                  >
                    Email
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                      />
                    </svg>
                  </th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Address</th>
                  <th
                    scope="col"
                    onClick={() => handleSortChange("company.name")}
                    className="sortable"
                  >
                    <div className="w-100 d-flex align-items-center">
                      Company Name
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                        />
                      </svg>
                    </div>
                  </th>
                  <th scope="col">Favorite</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredAndSortedUsers.map((user) => (
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
              onClick={() => setShowDeleteModal(true)}
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
                {currentPage} of {totalPages}
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

      <CreateUserModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        newUser={newUser}
        onInputChange={(e) =>
          setNewUser({ ...newUser, [e.target.name]: e.target.value })
        }
        onNestedInputChange={(e, key, nestedKey) =>
          setNewUser((prev) => ({
            ...prev,
            [key]: { ...prev[key], [nestedKey]: e.target.value },
          }))
        }
        onCreate={handleCreateUser}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default DashboardPage;
