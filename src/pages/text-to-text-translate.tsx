import TextBox from "../components/text-box";
import logo from "../assets/logo.png";
import HeadingButton from "../components/heading-button";
import { PiTextAaThin } from "react-icons/pi";

const TextToTextTranslate = () => {
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

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto bg-yellow-200">
      <div className="h-26 flex justify-between mb-3">
        <img
          src={logo}
          alt="Wordio Logo"
          className="w-44 h-10 ml-3 mt-8 mb-5"
          onClick={() => (window.location.href = "/")}
        />
        <HeadingButton
          icon={<PiTextAaThin className="w-7 h-7 m-2 cursor-pointer z-10" />}
          label="Text Translate"
        />
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
