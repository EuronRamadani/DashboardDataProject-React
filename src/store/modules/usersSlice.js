import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.json();
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );
    return response.json();
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete user.");
    }
    return userId; // Return the userId to update the Redux state
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to create user.");
    }
    const data = await response.json();
    return data; // Return the created user data
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    paginatedUsers: [],
    currentPage: 1,
    rowsPerPage: 5,
    totalPages: 1,
    selectedUser: null,
    loading: false,
    error: null,
    favorites: [],
  },
  reducers: {
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
      const start = (state.currentPage - 1) * state.rowsPerPage;
      const end = start + state.rowsPerPage;
      state.paginatedUsers = state.users.slice(start, end);
    },
    toggleFavorite(state, action) {
      const userId = action.payload;
      if (state.favorites.includes(userId)) {
        state.favorites = state.favorites.filter((id) => id !== userId);
      } else {
        state.favorites.push(userId);
      }
    },
    deleteUsers(state, action) {
      const userIdsToDelete = action.payload;
      state.users = state.users.filter(
        (user) => !userIdsToDelete.includes(user.id)
      );
      state.totalPages = Math.ceil(state.users.length / state.rowsPerPage);
      state.currentPage = Math.min(state.currentPage, state.totalPages);
      const start = (state.currentPage - 1) * state.rowsPerPage;
      const end = start + state.rowsPerPage;
      state.paginatedUsers = state.users.slice(start, end);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.totalPages = Math.ceil(action.payload.length / state.rowsPerPage);
        state.paginatedUsers = action.payload.slice(0, state.rowsPerPage);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;

        const updatedUserIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload;
        }

        const start = (state.currentPage - 1) * state.rowsPerPage;
        const end = start + state.rowsPerPage;
        state.paginatedUsers = state.users.slice(start, end);

        state.selectedUser = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const userIdToDelete = action.payload;

        // Remove the user from the users array
        state.users = state.users.filter((user) => user.id !== userIdToDelete);

        // Update paginated users and total pages
        const start = (state.currentPage - 1) * state.rowsPerPage;
        const end = start + state.rowsPerPage;
        state.paginatedUsers = state.users.slice(start, end);
        state.totalPages = Math.ceil(state.users.length / state.rowsPerPage);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, toggleFavorite, deleteUsers, clearSelectedUser } =
  usersSlice.actions;

export default usersSlice.reducer;
