import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Thunk pour récupérer les utilisateurs
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URI}/api/users/`);
    return res.data;
});

// 🔹 Slice Redux Toolkit
const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {}, // Pas besoin d'actions manuelles ici
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default usersSlice.reducer;
