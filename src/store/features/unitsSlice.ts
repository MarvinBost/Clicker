import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "@store/store";
import {subtractMoney} from "./moneySlice";

export type UnitsState = {
  apprentices: number;
  runes: number;
  dragons: number;
};

const initialState: UnitsState = {
  apprentices: 0,
  runes: 0,
  dragons: 0,
};

const unitPrices = {
  apprentices: 1000,
  runes: 10000,
  dragons: 1000000,
};

enum UnitsTranslationFR {
  apprentices = "apprenti",
  runes = "runes",
  dragons = "dragon",
}

// Thunk pour acheter une unité
export const buyUnit = createAsyncThunk(
  "units/buyUnit",
  async (
    {unit, count}: {unit: keyof UnitsState; count: number},
    {dispatch, getState}
  ) => {
    const state = getState() as RootState;
    const currentMoney = state.money.amount;
    const cost = unitPrices[unit];
    const totalCost = cost * count;

    if (currentMoney >= totalCost) {
      dispatch(subtractMoney(totalCost));
      return {unit, count};
    } else {
      throw new Error(
        `Pas assez d'argent pour acheter un(e) ${UnitsTranslationFR[unit]}`
      );
    }
  }
);

const unitsSlice = createSlice({
  name: "units",
  initialState: initialState,
  reducers: {
    addUnit: (
      state,
      action: {payload: {unit: keyof UnitsState; count: number}}
    ) => {
      state[action.payload.unit] += action.payload.count;
    },
    removeUnit: (
      state,
      action: {payload: {unit: keyof UnitsState; count: number}}
    ) => {
      const unit = state[action.payload.unit];
      if (unit && unit >= action.payload.count) {
        state[action.payload.unit] -= action.payload.count;
      }
    },
    resetUnits: (state) => {
      state.apprentices = 0;
      state.dragons = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buyUnit.fulfilled, (state, action) => {
      state[action.payload.unit] += action.payload.count;
    });
    builder.addCase(buyUnit.rejected, (_state, action) => {
      throw new Error(action.error.message);
    });
  },
});

export const {addUnit, removeUnit, resetUnits} = unitsSlice.actions;
export default unitsSlice.reducer;
