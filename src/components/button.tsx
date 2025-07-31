interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <div>
      <button onClick={onClick} className={className}>
        {label}
      </button>
    </div>
  );
};

export default Button;
