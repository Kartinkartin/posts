import { createSlice } from "@reduxjs/toolkit";

const usersToolkitSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addUser(state, action) {
            state.push(action.payload)
        },
    }
});

export default usersToolkitSlice.reducer;
export const { addUser } = usersToolkitSlice.actions;
