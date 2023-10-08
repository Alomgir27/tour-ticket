import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  data:  null,
  single: null,
};

const whatIncludeSlicer = createSlice({
  name: "whatIncludeController",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWhatInclude: (state, action) => {
      state.data = action.payload;
    },
    setSingle: (state, action) => {
      state.single = action.payload;
    },
  },
});

export const whatIncludeActions = whatIncludeSlicer.actions;
export default whatIncludeSlicer.reducer;
