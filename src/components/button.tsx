interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};

export default Button;
