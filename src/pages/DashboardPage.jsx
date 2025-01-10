import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../store/modules/usersSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
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
        )}
      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;
