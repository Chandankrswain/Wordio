import { useState } from "react";

interface Props {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

const HeadingButton = ({ icon, label, onClick, className }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (onClick) onClick();
  };

  return (
    <div
      className={`flex justify-end items-center w-[50%] relative overflow-visible m-5 ${className}`}
    >
      <div className="flex flex-col items-center relative">
        <button
          onClick={handleClick}
          className="bg-[#F4F5F7] mr-5 border border-b-4 border-r-4 rounded-2xl transition-transform duration-150 ease-in-out active:scale-95"
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
      </div>
    </div>
  );
};

export default HeadingButton;
