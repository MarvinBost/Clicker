import StatsPanel from '@components/Layout/StatsPanel';
import ActionPanel from '@components/Layout/ActionPanel';
import { UpgradeType } from '@store/features/upgradesSlice';

type MainTemplateProps = {
  score: number;
  level: number;
  experience: number;
  maxExperience: number;
  units: { apprentices: number, runes: number, dragons: number };
  money: number;
  upgrades: {
    [key in UpgradeType]: {
      level: number;
      cost: number;
      bonus: number;
    };
  };
  handleClick: () => void;
  buyUpgrade: (upgrade: UpgradeType) => void;
  buyApprentice: () => void;
  buyDragon: () => void;
};

const MainTemplate: React.FC<MainTemplateProps> = ({ score, level, units, money, upgrades, experience, maxExperience, handleClick, buyUpgrade, buyApprentice, buyDragon }) => (
  <main className="dark min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white p-8">
    <h1 className="text-4xl font-bold text-center mb-8">Forgeur de Lames Magiques</h1>
    <ActionPanel handleClick={handleClick} buyUpgrade={buyUpgrade} buyApprentice={buyApprentice} buyDragon={buyDragon} upgrades={upgrades} />
    <StatsPanel score={score} level={level} units={units} money={money} upgrades={upgrades} experience={experience} maxExperience={maxExperience} />
  </main>
);

export default MainTemplate;
