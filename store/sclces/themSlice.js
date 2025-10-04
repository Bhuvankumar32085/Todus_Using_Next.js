// store/themSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const themSlice = createSlice({
  name: "theme",        
  initialState: { them: false }, 
  reducers: {
    setThem: (state,action) => {
      state.them = action.payload; 
    },
  },
});

export const { setThem } = themSlice.actions;
export default themSlice.reducer;
