interface MainButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const MainButton = ({
  label,
  onClick,
  className = "",
  icon,
}: MainButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-base font-medium text-black bg-white rounded-lg hover:bg-gray-100 active:scale-95 transition-transform translate-3 duration-150 ease-in-out ${className}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default MainButton;
