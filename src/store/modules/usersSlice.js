import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch users from API
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

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    paginatedUsers: [],
    currentPage: 1,
    rowsPerPage: 5,
    totalPages: 1,
    loading: false,
    error: null,
    favorites: [], // List of favorite user IDs
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
        state.favorites = state.favorites.filter((id) => id !== userId); // Remove from favorites
      } else {
        state.favorites.push(userId); // Add to favorites
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
        state.selectedUser = action.payload; // This updates the selectedUser
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle the error
      });
  },
});

export const { setPage, toggleFavorite, deleteUsers, clearSelectedUser } =
  usersSlice.actions;
export default usersSlice.reducer;
