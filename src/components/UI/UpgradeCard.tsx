import {Button} from "@components/UI/Button";
import { Upgrade } from "@store/features/upgradesSlice";
import { Card } from "@/components/UI/card";

export type UpgradeCardProps = {
  name: string;
  upgrade: Upgrade;
  onClick: () => void;
};

const UpgradeCard: React.FC<UpgradeCardProps> = ({ name, upgrade, onClick }) => {
  const bonusPercentage = ((upgrade.bonus - 1) * 100).toFixed(2);
  return (
    <Card className="w-1/4 p-4">
      <h3>{name}</h3>
      <p>Coût : {upgrade.cost}$</p>
      <p>Bonus : {bonusPercentage}%</p>
      <Button onClick={onClick} children="Acheter" />
    </Card>
  );
};

export default UpgradeCard;