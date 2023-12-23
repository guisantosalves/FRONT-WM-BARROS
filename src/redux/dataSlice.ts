import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface DataState {
  layoutDisposition: boolean; // true -> table | false -> card
}

const initialState: DataState = {
  layoutDisposition: true,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setLayoutState(state, action) {
      state.layoutDisposition = action.payload;
    },
  },
});

export const { setLayoutState } = dataSlice.actions;
export const getLayoutDisposition = (state: AppState) =>
  state.data.layoutDisposition;

export default dataSlice.reducer;
