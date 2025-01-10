import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
});

// Async thunk to fetch a single user
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
    selectedUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetchUserById
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
      });
  },
});

export default usersSlice.reducer;
