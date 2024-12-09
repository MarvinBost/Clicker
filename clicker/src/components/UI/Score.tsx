type ScoreProps = {
  value: number;
};

const Score: React.FC<ScoreProps> = ({ value }) => <p>Score : <span>{value}</span></p>;

export default Score;
