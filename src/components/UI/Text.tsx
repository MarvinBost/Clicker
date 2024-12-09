type TextProps = {
  content: string;
};

const Text: React.FC<TextProps> = ({ content }) => (
  <p className="text">{content}</p>
);

export default Text;
