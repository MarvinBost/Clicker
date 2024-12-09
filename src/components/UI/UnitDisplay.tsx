

type UnitDisplayProps = {
  unitName: string;
  count: number;
  icon?: React.ReactNode;
};

const UnitDisplay: React.FC<UnitDisplayProps> = ({ unitName, count, icon }) => (
  <div className="flex flex-row gap-2">
    {icon}
    <p>{unitName} : {count}</p>
  </div>
);

export default UnitDisplay;
