import { createSlice } from '@reduxjs/toolkit';

const sizeFilterSlice = createSlice({
  name: 'sizeFilter',
  initialState: 'All', // Default value
  reducers: {
    setSizeFilter: (state, action) => action.payload,
  }
});

export const { setSizeFilter } = sizeFilterSlice.actions;

export default sizeFilterSlice.reducer;
