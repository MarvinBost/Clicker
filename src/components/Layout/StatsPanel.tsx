import { Coins, User, Wand2, BirdIcon as Dragon, Zap, Banknote, Clock3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { Progress } from "@components/UI/progress";

type StatsPanelProps = {
  score: number;
  level: number;
  experience: number;
  maxExperience: number;
  units: {apprentices: number; runes: number; dragons: number};
  money: number;
  upgrades: {
    [key: string]: {
      level: number;
      cost: number;
      bonus: number;
    };
  };
};

const StatsPanel: React.FC<StatsPanelProps> = ({
  score,
  level,
  units,
  money,
  experience,
  maxExperience,
  upgrades,
}) => {
  const progressPercentage = (experience / maxExperience) * 100;

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Statistiques du Forgeron</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <p className="text-xl font-semibold mb-2">Niveau {level}</p>
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <p className="text-4xl font-bold text-yellow-400">{score.toLocaleString()} points</p>
          </div>
          
          <StatItem icon={<User className="w-5 h-5" />} label="Apprentis" value={units.apprentices} />
          <StatItem icon={<Wand2 className="w-5 h-5" />} label="Runes" value={units.runes} />
          <StatItem icon={<Dragon className="w-5 h-5" />} label="Dragons" value={units.dragons} />
          <StatItem icon={<Coins className="w-5 h-5" />} label="Argent" value={money} />
          
          <StatItem icon={<Zap className="w-5 h-5" />} label="Boost XP" value={upgrades.boostXP.level} />
          <StatItem icon={<Banknote className="w-5 h-5" />} label="Boost Argent" value={upgrades.boostMoney.level} />
          <StatItem icon={<Clock3 className="w-5 h-5" />} label="Réduction Cooldown" value={upgrades.reduceCooldown.level} />
        </div>
      </CardContent>
    </Card>
  );
};

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: number }> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-md">
    {icon}
    <span className="flex-grow">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default StatsPanel;

