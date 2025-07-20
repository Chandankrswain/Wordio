import TextBox from "../components/text-box";
import logo from "../assets/logo.png";
import { useState } from "react";
import { PiTextAaThin } from "react-icons/pi";

const TextToTextTranslate = () => {
  const [isClicked, setIsClicked] = useState(false);

  const TextBoxArray = [
    {
      placeholder: "Enter the text here................",
      className:
        "w-full h-44 max-w-3xl p-4 resize-none text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition",
    },
    {
      placeholder: "Enter the text here................",
      className:
        "w-full h-44 max-w-3xl p-4 resize-none text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition",
    },
  ];

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
    } else setIsClicked(false);
  };

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto bg-yellow-200">
      <div className="h-26 flex justify-between mb-3">
        <img
          src={logo}
          alt="Wordio Logo"
          className="w-44 h-10 ml-3 mt-8 mb-5"
          onClick={() => (window.location.href = "/")}
        />
        <div className="flex justify-end items-center w-[50%] relative overflow-visible m-5">
          <div className="flex flex-col items-center relative">
            <button className="bg-[#F4F5F7] mr-5 border border-b-4 border-r-4 rounded rounded-2xl ">
              <PiTextAaThin
                onClick={handleClick}
                className="w-7 h-7 m-2 cursor-pointer z-10"
              />
            </button>
            <p
              className={`absolute top-full mt-1 text-sm transition-all duration-500 ease-in-out mr-5 whitespace-nowrap ${
                isClicked
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-2 opacity-0"
              }`}
            >
              Text Translate
            </p>
          </div>
        </div>
      </div>
      {TextBoxArray &&
        TextBoxArray.map((data, index) => (
          <TextBox
            key={index}
            placeholder={data?.placeholder}
            className={data?.className}
          />
        ))}
    </div>
  );
};

export default TextToTextTranslate;
