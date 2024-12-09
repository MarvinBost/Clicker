import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch} from "@store/store";
import {increment, gainExperience, addMoney, buyUpgrade} from "@store/features";
import {buyUnit} from "@store/features/unitsSlice";
import MainTemplate from "@components/MainTemplate";
import {useEffect, useState} from "react";
import { UpgradeType } from "@store/features/upgradesSlice";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const score = useSelector((state: RootState) => state.score.value);
  const level = useSelector((state: RootState) => state.level.current);
  const units = useSelector((state: RootState) => state.units);
  const money = useSelector((state: RootState) => state.money.amount);
  const upgrades = useSelector((state: RootState) => state.upgrades.upgrades);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    let experience = 10;
    let money = 10;

    // Application des améliorations
    const xpBonus =
      upgrades.boostXP.level > 0
        ? upgrades.boostXP.bonus ** upgrades.boostXP.level
        : 1;
    const moneyBonus =
      upgrades.boostMoney.level > 0
        ? upgrades.boostMoney.bonus ** upgrades.boostMoney.level
        : 1;

    money += level * 10;
    experience *= xpBonus;
    money *= moneyBonus;

    if (units.runes > 0) {
      experience *= units.runes;
      money *= units.runes;
    }

    dispatch(increment(1));
    dispatch(gainExperience(experience));
    dispatch(addMoney(money));
  };

  const buyUpgradeHandler = (upgradeKey: UpgradeType) => {
    const upgrade = upgrades[upgradeKey];
    if (money >= upgrade.cost) {
      dispatch(addMoney(-upgrade.cost));
      dispatch(buyUpgrade({upgrade: upgradeKey}));
    } else {
      setError("Pas assez d'argent pour acheter cette amélioration.");
    }
  };

  //#region Achat d'unités

  // Fonction pour acheter un apprenti
  const buyApprentice = async () => {
    try {
      await dispatch(buyUnit({unit: "apprentices", count: 1}));
    } catch (e) {
      setError(null);
      if (e instanceof Error) {
        setError(e.message);
        setTimeout(() => setError(null), 3000);
      } else {
        setError(String(e));
        setTimeout(() => setError(null), 3000);
      }
    }
  };
  // Fonction pour acheter un dragon
  const buyDragon = async () => {
    try {
      await dispatch(buyUnit({unit: "dragons", count: 1}));
    } catch (e) {
      setError(null);
      if (e instanceof Error) {
        setError(e.message);
        setTimeout(() => setError(null), 3000);
      } else {
        setError(String(e));
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  //#endregion

  //#region Effets secondaires
  // Effet pour gérer les apprentis (1 apprenti = +1 score, +10 XP, +10 argent toutes les 5 secondes)
  useEffect(() => {
    if (units.apprentices > 0) {
      const intervalId = setInterval(() => {
        dispatch(increment(units.apprentices)); // Ajouter le score
        dispatch(gainExperience(units.apprentices * 10)); // Gagner de l'XP
        dispatch(addMoney(units.apprentices * 10)); // Gagner de l'argent
      }, 5000); // Déclencher toutes les 5 secondes

      // Nettoyage du setInterval lorsque le composant est démonté ou que les apprentis changent
      return () => clearInterval(intervalId);
    }
  }, [dispatch, units.apprentices]); // Exécuter l'effet seulement lorsque `units.apprentices` change

  // Effet pour gérer les dragons (1 dragon = +2000 score, +20000 XP, +20000 argent toutes les 30 secondes)
  useEffect(() => {
    if (units.dragons > 0) {
      const intervalId = setInterval(() => {
        dispatch(increment(units.dragons * 2000)); // Ajouter le score
        dispatch(gainExperience(units.dragons * 20000)); // Gagner de l'XP
        dispatch(addMoney(units.dragons * 20000)); // Gagner de l'argent
      }, 30000); // Déclencher toutes les 30 secondes

      // Nettoyage du setInterval lorsque le composant est démonté ou que les dragons changent
      return () => clearInterval(intervalId);
    }
  }, [dispatch, units.dragons]); // Exécuter l'effet seulement lorsque `units.dragons` change
  //#endregion

  return (
    <>
      <MainTemplate
        score={score}
        level={level}
        units={units}
        money={money}
        upgrades={upgrades}
        handleClick={handleClick}
        buyUpgrade={buyUpgradeHandler}
        buyApprentice={buyApprentice}
        buyDragon={buyDragon}
      />
      {error && <div className="modal error">{error}</div>}
    </>
  );
}

export default App;
