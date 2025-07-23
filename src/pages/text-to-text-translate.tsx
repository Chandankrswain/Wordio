import TextBox from "../components/text-box";
import logo from "../assets/logo.png";
import HeadingButton from "../components/heading-button";
import { PiTextAaThin } from "react-icons/pi";
import LanguageButton from "../components/language-button";
import { useState } from "react";
import { LanguageData, TranslateData } from "../utils/api";

interface LanguageDataType {
  name: string;
  code: string;
}

const TextToTextTranslate = () => {
  const [allLanguage, setAllLanguages] = useState<LanguageDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [languageTo, setLanguageTo] = useState("");
  const [languageFrom, setLanguageFrom] = useState("");
  const [isSelectingTo, setIsSelectingTo] = useState<boolean>(true);
  const [textBoxContent, setTextBoxContent] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const languageService = new LanguageData();
  const translator = new TranslateData();

  const fetchLanguage = async () => {
    setIsLoading(true);
    try {
      const result = await languageService.fetchLanguages();
      setAllLanguages(result);
    } catch (error) {
      console.error("Error fetching languages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTranslateText = async () => {
    if (!languageFrom || !languageTo || !textBoxContent) return;
    try {
      const result = await translator.postTranslate(
        textBoxContent,
        languageFrom,
        languageTo
      );
      setTranslatedText(result.responseData.translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };

  const handleClick = (type: "to" | "from") => {
    setIsSelectingTo(type === "to");
    if (allLanguage.length > 0) {
      setAllLanguages([]);
    } else {
      fetchLanguage();
    }
  };

  const handleLanguageSelect = (code: string) => {
    if (isSelectingTo) {
      setLanguageTo(code);
    } else {
      setLanguageFrom(code);
    }
    setAllLanguages([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextBoxContent(e.target.value);
  };

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto bg-yellow-200">
      {/* Header */}
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

      {/* Text Input */}
      <TextBox
        placeholder="Enter the text here................"
        className="w-full h-44 max-w-3xl p-4 resize-none focus:outline-none focus:border-none text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
        value={textBoxContent}
        onChange={handleChange}
      />

      {/* Language Buttons */}
      <div className="flex w-full justify-evenly mb-2">
        <LanguageButton
          label="Change From"
          onClick={() => handleClick("from")}
        />
        <LanguageButton label="Change To" onClick={() => handleClick("to")} />
      </div>

      {/* Show selected language codes */}
      <div className="text-center text-sm text-gray-800 mb-2">
        {languageFrom && <p>From: {languageFrom}</p>}
        {languageTo && <p>To: {languageTo}</p>}
      </div>

      {/* Language dropdown */}
      <div className="mt-2 px-4">
        {isLoading ? (
          <div className="text-sm text-gray-700">Loading languages...</div>
        ) : (
          allLanguage.map((lang, index) => (
            <button
              key={index}
              className="py-1 px-3 bg-white hover:bg-gray-100 rounded mb-1 text-left w-full"
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {lang.name}
            </button>
          ))
        )}
      </div>

      {/* Translate Button */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
          onClick={fetchTranslateText}
          disabled={!languageFrom || !languageTo || !textBoxContent}
        >
          Translate
        </button>
      </div>
      <h1>{translatedText}</h1>
    </div>
  );
};

export default TextToTextTranslate;
