import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "Honrau7",
  timeClass: "Rapid",
  startDate: "2013-01-01",
  endDate: "2023-01-01",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTimeClass: (state, newClass) => {
      state.timeClass = newClass.payload;
    },
    setDates: (state, newStartDate) => {
      state.startDate = newStartDate.payload.startDate;
      state.endDate = newStartDate.payload.endDate;
    },
  },
});

export const { setMode, setTimeClass, setDates } = globalSlice.actions;
export default globalSlice.reducer;
