import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@store/store';
import { increment, gainExperience, addMoney } from '@store/features';
import { buyUnit } from '@store/features/unitsSlice';
import MainTemplate from '@components/MainTemplate';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const score = useSelector((state: RootState) => state.score.value);
  const level = useSelector((state: RootState) => state.level.current);
  const units = useSelector((state: RootState) => state.units);
  const money = useSelector((state: RootState) => state.money.amount);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    dispatch(increment(1));
    dispatch(gainExperience(10));
    dispatch(addMoney(10));
  };

  const buyApprentice = async () => {
    try {
      await dispatch(buyUnit({ unit: 'apprentices', count: 1 }));
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

  const buyDragon = async () => {
    try {
      await dispatch(buyUnit({ unit: 'dragons', count: 1 }));
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
  }

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


   return (
    <>
    <MainTemplate
      score={score}
      level={level}
      units={units}
      money={money}
      handleClick={handleClick}
      buyApprentice={buyApprentice}
      buyDragon={buyDragon}
    />
    {error && <div className='modal error'>{error}</div>}
    </>
  );
}

export default App;
