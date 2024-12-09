import {configureStore} from "@reduxjs/toolkit";
import {
  scoreReducer,
  levelReducer,
  unitsReducer,
  moneyReducer,
} from "./features";

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (e) {
    console.error("Could not load state from localStorage:", e);
  }
  return {};
};

// Nous définissons un état initial en fonction des slices existants
export const store = configureStore({
  reducer: {
    score: scoreReducer,
    level: levelReducer,
    units: unitsReducer,
    money: moneyReducer,
  },
  preloadedState: loadStateFromLocalStorage(),
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const serializedState = JSON.stringify(state); // Sérialisation de l'état
    localStorage.setItem("appState", serializedState); // Stockage dans localStorage
  } catch (e) {
    console.error("Could not save state to localStorage:", e);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
