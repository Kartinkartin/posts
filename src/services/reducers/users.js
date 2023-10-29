import { createSlice } from "@reduxjs/toolkit";

const usersToolkitSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addUsers(state, action) {
            state.push(...action.payload);
        },
    }
});

export default usersToolkitSlice.reducer;
export const { addUsers } = usersToolkitSlice.actions;
