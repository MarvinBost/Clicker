import StatsPanel from '@components/Layout/StatsPanel';
import ActionPanel from '@components/Layout/ActionPanel';
import './MainTemplate.css';

type MainTemplateProps = {
  score: number;
  level: number;
  units: { apprentices: number };
  money: number;
  handleClick: () => void;
  buyApprentice: () => void;
  buyDragon: () => void;
};

const MainTemplate: React.FC<MainTemplateProps> = ({ score, level, units, money, handleClick, buyApprentice, buyDragon }) => (
  <main className="main-template">
    <h1>Forgeur de Lames Magiques</h1>
    <ActionPanel handleClick={handleClick} buyApprentice={buyApprentice} buyDragon={buyDragon} />
    <StatsPanel score={score} level={level} units={units} money={money} />
  </main>
);

export default MainTemplate;
