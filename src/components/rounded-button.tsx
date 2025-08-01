import { useState } from "react";

interface Props {
  icon: React.ReactNode;
  title?: string;
  onClick?: () => void;
  className?: string;
}

const HeadingButton = ({ icon, onClick, title }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (onClick) onClick();
  };

  return (
    <div className="">
      <div className="flex flex-col items-center">
        <button
          onClick={handleClick}
          className="bg-[#F4F5F7] border border-b-4 border-r-4 rounded-2xl transition-transform duration-150 ease-in-out active:scale-95"
        >
          {icon}
        </button>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default HeadingButton;
