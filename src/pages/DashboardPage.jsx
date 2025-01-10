import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  setPage,
  toggleFavorite,
  deleteUsers,
} from "../store/modules/usersSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { paginatedUsers, currentPage, totalPages, loading, error, favorites } =
    useSelector((state) => state.users);

  const [selectedUsers, setSelectedUsers] = useState([]); // Selected user IDs

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

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedUsers.length === paginatedUsers.length &&
                        selectedUsers.length > 0
                      }
                    />
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Favorite</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={
                      favorites.includes(user.id) ? "bg-yellow-100" : ""
                    }
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleFavorite(user.id)}
                        className={`px-2 py-1 rounded ${
                          favorites.includes(user.id)
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        {favorites.includes(user.id)
                          ? "Unfavorite"
                          : "Favorite"}
                      </button>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => navigate(`/details/${user.id}`)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Batch Actions */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleDelete}
                disabled={selectedUsers.length === 0}
                className={`px-4 py-2 rounded ${
                  selectedUsers.length === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Delete Selected
              </button>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;
