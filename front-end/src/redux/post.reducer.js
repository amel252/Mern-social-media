import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URI}/api/post/`);
    return res.data;
});

const postsSlice = createSlice({
    name: "posts",
    initialState: [], // on part d'un tableau vide
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (_, action) => action.payload);
    },
});

export default postsSlice.reducer;
