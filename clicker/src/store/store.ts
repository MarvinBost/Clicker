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

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || "default";

const hashState = (state: unknown) => {
  return CryptoJS.SHA256(JSON.stringify(state)).toString();
};

const encryptState = (state: unknown) => {
  const serializedState = JSON.stringify(state);
  return CryptoJS.AES.encrypt(serializedState, ENCRYPTION_KEY).toString();
};

const decryptState = (encryptedState: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedState, ENCRYPTION_KEY);
  const decryptedState = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedState);
};

const loadStateFromLocalStorage = () => {
  try {
    const encryptedState = localStorage.getItem("appState");
    const serializedHash = localStorage.getItem("appStateHash");
    if (encryptedState && serializedHash) {
      const state = decryptState(encryptedState);
      const hash = hashState(state);
      if (hash === serializedHash) {
        return state;
      } else {
        console.warn("State was modified, ignoring it");
      }
    }
  } catch (e) {
    console.error("Could not load state from localStorage:", e);
  }
  return {};
};

const saveStateToLocalStorage = (state: unknown) => {
  try {
    const encryptedState = encryptState(state);
    const hash = hashState(state);
    localStorage.setItem("appState", encryptedState);
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
