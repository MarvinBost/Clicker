import {createSlice} from "@reduxjs/toolkit";

// Type pour l'état de l'argent
type MoneyState = {
  amount: number;
};

// État initial (argent initialisé à 0)
const initialState: MoneyState = {
  amount: 0,
};

// Slice pour gérer l'argent
const moneySlice = createSlice({
  name: "money",
  initialState: initialState,
  reducers: {
    addMoney: (state, action: {payload: number}) => {
      state.amount += action.payload;
    },
    subtractMoney: (state, action: {payload: number}) => {
      state.amount -= action.payload;
    },
    resetMoney: (state) => {
      state.amount = 0;
    },
  },
});

export const {addMoney, subtractMoney, resetMoney} = moneySlice.actions;
export default moneySlice.reducer;
