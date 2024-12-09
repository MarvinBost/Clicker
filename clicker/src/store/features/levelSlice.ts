import {createSlice} from "@reduxjs/toolkit";

export type LevelState = {
  current: number;
  experience: number;
  maxExperience: number;
};

const initialState: LevelState = {
  current: 1,
  experience: 0,
  maxExperience: 100,
};

const levelSlice = createSlice({
  name: "level",
  initialState: initialState,
  reducers: {
    gainExperience: (state, action) => {
      state.experience += action.payload;
      if (state.experience >= state.maxExperience) {
        state.experience -= state.maxExperience;
        state.current += 1;
        state.maxExperience = Math.floor(state.maxExperience * 1.2); // Dynamique
      }
    },
    resetLevel: (state) => {
      state.current = 1;
      state.experience = 0;
      state.maxExperience = 100;
    },
  },
});

export const {gainExperience, resetLevel} = levelSlice.actions;
export default levelSlice.reducer;
