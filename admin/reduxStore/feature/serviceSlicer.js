import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  data: undefined,
  service: undefined,
};

const serviceSlicer = createSlice({
  name: "serviceController",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSerivces: (state, action) => {
      state.data = action.payload;
    },
    setSerivce: (state, action) => {
      state.service = action.payload;
    },
  },
});

export const serviceActions = serviceSlicer.actions;
export default serviceSlicer.reducer;
