interface Props {
  label: string;
  onClick: () => void;
  className: string;
}

const LanguageButton = ({ label, onClick, className }: Props) => {
  return (
    <div>
      <button onClick={onClick} className={className}>
        {label}
      </button>
    </div>
  );
};

export default LanguageButton;
