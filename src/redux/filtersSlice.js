import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    name: ''
  },
  reducers: {
    changeFilter: (state, { payload: filter }) => {
      state.name = filter;
    },
  },
});

export const selectNameFilter = ({filters}) => filters.name;

export const filtersReducer = filtersSlice.reducer;
export const { changeFilter } = filtersSlice.actions;
