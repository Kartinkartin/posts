import { createSlice } from "@reduxjs/toolkit";

const commentsToolkitSlice = createSlice({
    name: "comments",
    initialState: {},
    reducers: {
        getComments(state, action) {
            state[action.payload.id] = [...action.payload.comments];
        }
    }
})

export default commentsToolkitSlice.reducer;
export const { getComments } = commentsToolkitSlice.actions;
