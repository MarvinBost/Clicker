import {configureStore} from "@reduxjs/toolkit";
import {
  scoreReducer,
  levelReducer,
  unitsReducer,
  moneyReducer,
  ScoreState,
  LevelState,
  UnitsState,
  MoneyState,
} from "@store/features";
import CryptoJS from "crypto-js";

const hashState = (state: any) => {
  return CryptoJS.SHA256(JSON.stringify(state)).toString();
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    const serializedHash = localStorage.getItem("appStateHash");
    if (serializedState && serializedHash) {
      const state = JSON.parse(serializedState);
      const hash = hashState(state);
      if (hash === serializedHash) {
        return state;
      } else {
        console.warn("You cheated! State has been reset.");
      }
    }
  } catch (e) {
    console.error("Could not load state from localStorage:", e);
  }
  return {};
};

const saveStateToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    const hash = hashState(state);
    localStorage.setItem("appState", serializedState);
    localStorage.setItem("appStateHash", hash);
  } catch (e) {
    console.error("Could not save state to localStorage:", e);
  }
};

// Nous définissons un état initial en fonction des slices existants
export const store = configureStore({
  reducer: {
    score: scoreReducer,
    level: levelReducer,
    units: unitsReducer,
    money: moneyReducer,
  },
  preloadedState: loadStateFromLocalStorage() as {
    score: ScoreState;
    level: LevelState;
    units: UnitsState;
    money: MoneyState;
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveStateToLocalStorage(state);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
