import Score from '@components/UI/Score';
import UnitDisplay from '@components/UI/UnitDisplay';
import Text from '@components/UI/Text';
import './StatsPanel.css';

type StatsPanelProps = {
  score: number;
  level: number;
  units: { apprentices: number };
  money: number;
};

const StatsPanel: React.FC<StatsPanelProps> = ({ score, level, units, money }) => (
  <div className="stats-panel">
    <Text content={`Niveau : ${level}`} />
    <Score value={score} />
    <UnitDisplay unitName="Apprentis" count={units.apprentices} />
    <Text content={`Argent : ${money}$`} />
  </div>
);

export default StatsPanel;
