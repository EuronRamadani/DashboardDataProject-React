import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [users, setUsers] = useState([]); // Fetched data
  const [selectedUsers, setSelectedUsers] = useState([]); // Selected user IDs
  const [favorites, setFavorites] = useState([]); // Favorite user IDs
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [sortField, setSortField] = useState(""); // Field to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order: 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage] = useState(5); // Rows per page
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error handling
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    const fieldA = a[sortField].toLowerCase();
    const fieldB = b[sortField].toLowerCase();
    return fieldA < fieldB
      ? sortOrder === "asc"
        ? -1
        : 1
      : fieldA > fieldB
      ? sortOrder === "asc"
        ? 1
        : -1
      : 0;
  });

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSelect = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map((user) => user.id));
    }
  };

  const handleBatchDelete = () => {
    const remainingUsers = users.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    setUsers(remainingUsers);
    setSelectedUsers([]);
    setSuccessMessage("Selected users were deleted successfully.");
  };

  const handleMarkAsFavorite = () => {
    const newFavorites = [
      ...favorites,
      ...selectedUsers.filter((id) => !favorites.includes(id)),
    ];
    setFavorites(newFavorites);
    setSelectedUsers([]);
    setSuccessMessage("Selected users were marked as favorites.");
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {successMessage}
          </div>
        )}

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or email"
            className="w-full border border-gray-300 rounded p-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Batch Actions */}
        <div className="mb-4 flex gap-4">
          <button
            onClick={handleBatchDelete}
            disabled={selectedUsers.length === 0}
            className={`px-4 py-2 rounded ${
              selectedUsers.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Delete Selected
          </button>
          <button
            onClick={handleMarkAsFavorite}
            disabled={selectedUsers.length === 0}
            className={`px-4 py-2 rounded ${
              selectedUsers.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Mark as Favorite
          </button>
        </div>

        {/* Loading/Error */}
        {loading && <p>Loading data...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Data Table */}
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
                        selectedUsers.length > 0 &&
                        selectedUsers.length === currentUsers.length
                      }
                    />
                  </th>
                  <th
                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name{" "}
                    {sortField === "name"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                  <th
                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                    onClick={() => handleSort("email")}
                  >
                    Email{" "}
                    {sortField === "email"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Favorite</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`${
                      favorites.includes(user.id) ? "bg-yellow-100" : ""
                    } hover:bg-gray-100`}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelect(user.id)}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {favorites.includes(user.id) ? "⭐" : ""}
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

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredUsers.length / rowsPerPage)}
              </span>
              <div className="flex gap-2">
                {[
                  ...Array(
                    Math.ceil(filteredUsers.length / rowsPerPage)
                  ).keys(),
                ].map((page) => (
                  <button
                    key={page + 1}
                    onClick={() => paginate(page + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;
