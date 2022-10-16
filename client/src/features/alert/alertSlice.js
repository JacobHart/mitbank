import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: [],
  reducers: {

    setAlert: (state, action) => {
      state.push(action.payload);
    },

    removeAlert: (state, action) => {
        return state.filter(alert => alert.id !== action.payload)
    }
  
  }
});

export const { setAlert, removeAlert } = alertSlice.actions;


export default alertSlice.reducer;
