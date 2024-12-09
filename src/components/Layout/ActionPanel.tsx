import { Button } from "@components/UI/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/UI/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/UI/tabs"
import { Hammer, UserPlus, BirdIcon as Dragon, Zap, Coins, Clock } from 'lucide-react'
import { Upgrade, upgradeLabels, UpgradeType } from '@store/features/upgradesSlice'

type ActionPanelProps = {
  handleClick: () => void;
  buyUpgrade: (upgrade: UpgradeType) => void;
  buyApprentice: () => void;
  buyDragon: () => void;
  upgrades: {[key in UpgradeType]: Upgrade};
};

const ActionPanel: React.FC<ActionPanelProps> = ({ handleClick, buyUpgrade, buyApprentice, buyDragon, upgrades }) => {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Actions du Forgeron</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="actions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="upgrades">Améliorations</TabsTrigger>
          </TabsList>
          <TabsContent value="actions" className="space-y-4 mt-4">
            <ActionButton icon={<Hammer className="w-5 h-5 mr-2" />} onClick={handleClick}>
              Forger (+1 score, +10 XP)
            </ActionButton>
            <ActionButton icon={<UserPlus className="w-5 h-5 mr-2" />} onClick={buyApprentice}>
              Acheter un apprenti (1000$)
            </ActionButton>
            <ActionButton icon={<Dragon className="w-5 h-5 mr-2" />} onClick={buyDragon}>
              Acheter un dragon (1 000 000$)
            </ActionButton>
          </TabsContent>
          <TabsContent value="upgrades" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upgradeLabels.map((upgrade) => {
                const upgradeData = upgrades[upgrade.type];
                return (
                  <UpgradeCard
                    key={upgrade.type}
                    name={upgrade.label}
                    upgrade={upgradeData}
                    onClick={() => buyUpgrade(upgrade.type)}
                    icon={getUpgradeIcon(upgrade.type)}
                  />
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const ActionButton: React.FC<{ icon: React.ReactNode; onClick: () => void; children: React.ReactNode }> = ({ icon, onClick, children }) => (
  <Button 
    variant="ghost" 
    size="lg" 
    className="w-full text-left flex items-center justify-start bg-gray-900 hover:bg-gray-800 transition-colors"
    onClick={onClick}
  >
    {icon}
    {children}
  </Button>
);

const UpgradeCard: React.FC<{ name: string; upgrade: Upgrade; onClick: () => void; icon: React.ReactNode }> = ({ name, upgrade, onClick, icon }) => (
  <Card className="bg-gray-800">
    <CardHeader>
      <CardTitle className="text-lg flex items-center">
        {icon}
        <span className="ml-2">{name}</span>
      </CardTitle>
      <CardDescription>Niveau: {upgrade.level}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Coût: {upgrade.cost}$</p>
      <p>Bonus: x{upgrade.bonus}</p>
    </CardContent>
    <CardFooter>
      <Button onClick={onClick} className="w-full">Améliorer</Button>
    </CardFooter>
  </Card>
);

const getUpgradeIcon = (type: UpgradeType) => {
  switch (type) {
    case 'boostXP':
      return <Zap className="w-5 h-5" />;
    case 'boostMoney':
      return <Coins className="w-5 h-5" />;
    case 'reduceCooldown':
      return <Clock className="w-5 h-5" />;
    default:
      return null;
  }
};

export default ActionPanel;

