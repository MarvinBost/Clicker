import {createSlice} from "@reduxjs/toolkit";

type ScoreState = {
  value: number;
};

const initialState: ScoreState = {
  value: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += action.payload || 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const {increment, reset} = scoreSlice.actions;
export default scoreSlice.reducer;
