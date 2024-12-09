//#region Reducers and Actions
export { default as scoreReducer, increment, reset } from "./scoreSlice";
export { default as levelReducer, gainExperience, resetLevel } from "./levelSlice";
export { default as unitsReducer, addUnit, removeUnit, resetUnits, buyUnit } from "./unitsSlice";
export { default as moneyReducer, addMoney, subtractMoney, resetMoney } from "./moneySlice";
export { default as upgradesReducer, buyUpgrade } from "./upgradesSlice";
//#endregion

//#region Types
export type { ScoreState } from "./scoreSlice";
export type { LevelState } from "./levelSlice";
export type { UnitsState } from "./unitsSlice";
export type { MoneyState } from "./moneySlice";
export type { UpgradeState } from "./upgradesSlice";
//#endregion