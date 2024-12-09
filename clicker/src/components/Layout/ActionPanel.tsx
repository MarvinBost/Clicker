import Button from '@components/UI/Button';
import './ActionPanel.css';

type ActionPanelProps = {
  handleClick: () => void;
  buyApprentice: () => void;
  buyDragon: () => void;
};

const ActionPanel: React.FC<ActionPanelProps> = ({ handleClick, buyApprentice, buyDragon }) => (
  <div className="action-panel">
    <Button label="Forger (+1 score, +10 XP)" onClick={handleClick} />
    <Button label="Acheter un apprenti (-1000$)" onClick={buyApprentice} />
    <Button label="Acheter un dragon (-1 000 000$)" onClick={buyDragon} />
  </div>
);

export default ActionPanel;

