interface Props {
  label: string;
  onClick: () => void;
}

const LanguageButton = ({ label, onClick }: Props) => {
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default LanguageButton;
