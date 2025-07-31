interface MainButtonProps {
  label?: string;
  title?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const MainButton = ({
  label,
  onClick,
  className = "",
  icon,
  title = "",
}: MainButtonProps) => {
  return (
    <div className="flex flex-col items-center justify-between">
      <button
        onClick={onClick}
        className={`flex items-center mb-1 justify-center w-full px-4 py-2 font-medium text-black bg-white rounded-lg hover:bg-gray-100 active:scale-95 transition-transformduration-150 ease-in-out ${className}`}
      >
        {icon}
        {label}
      </button>
      <p className="text-xs w-[70px] text-center">{title}</p>
    </div>
  );
};

export default MainButton;
