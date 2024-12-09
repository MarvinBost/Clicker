import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum UpgradeType {
  BoostXP = "boostXP",
  BoostMoney = "boostMoney",
  ReduceCooldown = "reduceCooldown",
}

export const upgradeLabels: {type: UpgradeType; label: string}[] = [
  {type: UpgradeType.BoostXP, label: "Amélioration XP"},
  {type: UpgradeType.BoostMoney, label: "Amélioration argent"},
  {type: UpgradeType.ReduceCooldown, label: "Réduction de cooldown"},
];

export type UpgradeState = {
  upgrades: {[key in UpgradeType]: Upgrade};
};

export type Upgrade = {
  level: number;
  cost: number;
  bonus: number;
};

const initialState: UpgradeState = {
  upgrades: {
    boostXP: {level: 0, cost: 100, bonus: 1.2}, // +20% XP
    boostMoney: {level: 0, cost: 200, bonus: 1.3}, // +30% argent
    reduceCooldown: {level: 0, cost: 300, bonus: 0.9}, // Réduction de cooldown
  },
};

const upgradesSlice = createSlice({
  name: "upgrades",
  initialState,
  reducers: {
    buyUpgrade: (state, action: PayloadAction<{upgrade: UpgradeType}>) => {
      const upgrade = state.upgrades[action.payload.upgrade];
      if (upgrade) {
        upgrade.level += 1;
        upgrade.cost = Math.ceil(upgrade.cost * 1.5); // Augmentation du coût
      }
    },
  },
});

export const {buyUpgrade} = upgradesSlice.actions;
export default upgradesSlice.reducer;
