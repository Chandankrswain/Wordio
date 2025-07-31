import { useState } from "react";

interface Props {
  icon: React.ReactNode;
  label: string;
  title?: string;
  onClick?: () => void;
  className?: string;
}

const HeadingButton = ({ icon, label, onClick, className, title }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (onClick) onClick();
  };

  return (
    <div className={`flex  w-[50%] relative overflow-visible ${className}`}>
      <div className="flex flex-col items-center relative">
        <button
          onClick={handleClick}
          className="bg-[#F4F5F7] border border-b-4 border-r-4 rounded-2xl transition-transform duration-150 ease-in-out active:scale-95"
        >
          {icon}
        </button>
        <p
          className={`absolute top-full mt-1 text-sm transition-all duration-500 ease-in-out mr-5 whitespace-nowrap ${
            isClicked ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          {label}
        </p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default HeadingButton;
