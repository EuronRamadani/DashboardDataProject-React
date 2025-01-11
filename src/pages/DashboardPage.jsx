import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  setPage,
  toggleFavorite,
  deleteUsers,
} from "../store/modules/usersSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { paginatedUsers, currentPage, totalPages, loading, error, favorites } =
    useSelector((state) => state.users);

  const [selectedUsers, setSelectedUsers] = useState([]);

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

  const handleDelete = () => {
    dispatch(deleteUsers(selectedUsers));
    setSelectedUsers([]);
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
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="container">
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
                  <th scope="col">Email</th>
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
                    <td>{user.email}</td>
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
              onClick={handleDelete}
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
    </div>
  );
};

export default DashboardPage;
