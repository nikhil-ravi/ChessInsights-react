import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userName: "Honrau7",
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
    setUserName: (state, newName) => {
      state.userName = newName.payload;
    },
    setTimeClass: (state, newClass) => {
      state.timeClass = newClass.payload;
    },
    setDates: (state, newStartDate) => {
      state.startDate = newStartDate.payload[0];
      state.endDate = newStartDate.payload[1];
    },
  },
});

export const { setMode, setTimeClass, setDates, setUserName } =
  globalSlice.actions;
export default globalSlice.reducer;
