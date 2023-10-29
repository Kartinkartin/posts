import { createSlice } from "@reduxjs/toolkit";

const errorToolkitSlice = createSlice({
  name: "error",
  initialState: {
    text: "",
    type: null,
  },
  reducers: {
    throwError(state, action) {
      return (state = {...state, ...action.payload});
    },
    clearError(state) {
      return (state = {
        text: "",
        type: null,
      });
    },
  },
});

export default errorToolkitSlice.reducer;
export const { throwError, clearError } = errorToolkitSlice.actions;
