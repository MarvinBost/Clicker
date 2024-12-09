import Text from "@components/UI/Text";

type UnitDisplayProps = {
  unitName: string;
  count: number;
};

const UnitDisplay: React.FC<UnitDisplayProps> = ({ unitName, count }) => (
  <Text content={`${unitName} : ${count}`} />
);

export default UnitDisplay;
