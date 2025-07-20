import { useState } from "react";

interface Props {
  icon: React.ReactNode;
  label: string;
}

const HeadingButton = ({ icon, label }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
    } else setIsClicked(false);
  };

  return (
    <div className="flex justify-end items-center w-[50%] relative overflow-visible m-5">
      <div className="flex flex-col items-center relative">
        <button
          onClick={handleClick}
          className="bg-[#F4F5F7] mr-5 border border-b-4 border-r-4 rounded rounded-2xl "
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
