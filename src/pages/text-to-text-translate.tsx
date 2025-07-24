import TextBox from "../components/text-box";
import logo from "../assets/logo.png";
import HeadingButton from "../components/heading-button";
import {
  PiCopySimpleLight,
  PiCopySimpleThin,
  PiSoundcloudLogoThin,
  PiTextAaThin,
  PiUserSoundLight,
} from "react-icons/pi";
import LanguageButton from "../components/language-button";
import { useEffect, useState } from "react";
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
  const [selectedLanguageFrom, setSelectedLanguageFrom] = useState("");
  const [selectedLanguageTo, setSelectedLanguagTo] = useState("");

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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (languageFrom && languageTo && textBoxContent.trim()) {
        fetchTranslateText();
      } else {
        setTranslatedText("");
      }
    }, 100);

    return () => clearTimeout(delayDebounce);
  }, [textBoxContent, languageFrom, languageTo]);

  const fetchTranslateText = async () => {
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

  const handleLanguageSelect = (code: string, name: string) => {
    if (isSelectingTo) {
      setLanguageTo(code);
      setSelectedLanguagTo(name);
    } else {
      setLanguageFrom(code);
      setSelectedLanguageFrom(name);
    }
    setAllLanguages([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextBoxContent(e.target.value);
  };

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto bg-yellow-200 justify-between">
      {/* Header */}
      <div className="h-26 flex justify-between">
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

      <div className="relative h-[80%]">
        {/* Text Input */}
        <div className="bg-yellow-100 p-8 h-[350px] rounded-tl-[120px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center w-[60%]">
              <PiSoundcloudLogoThin className="w-8 h-8 ml-8" />
              <p className="ml-3">{selectedLanguageFrom}</p>
            </div>
            <PiCopySimpleThin className="w-5 h-5" />
          </div>
          <TextBox
            placeholder="Enter the text here"
            className="w-full h-40 max-w-3xl p-4 ml-5 resize-none text-2xl leading-relaxed focus:outline-none transition "
            value={textBoxContent}
            onChange={handleChange}
          />
        </div>
        <div className=" text-gray-900 absolute top-64 p-8 w-full sp-4 h-full bg-[#f4f5f7] rounded-tl-[120px] shadow">
          <div className="flex justify-between mt-4 items-center">
            <div className="flex items-center  w-[60%]">
              <PiSoundcloudLogoThin className="w-8 h-8 ml-8" />
              <p className="ml-3">{selectedLanguageTo}</p>
            </div>
            <PiCopySimpleThin className="w-5 h-5" />
          </div>
          <p className="text-2xl p-4 leading-12 overflow-auto ml-5 h-54 text-black">
            {translatedText || "Translation..."}
          </p>
        </div>
      </div>

      {/* Language Buttons */}
      <div className="flex w-full justify-evenly z-30">
        <LanguageButton
          label="Change From"
          onClick={() => handleClick("from")}
          className=""
        />
        <LanguageButton
          label="Change To"
          className=""
          onClick={() => handleClick("to")}
        />
      </div>

      {/* Language dropdown */}
      <div className="mt-2 px-4 z-20">
        {isLoading ? (
          <div className="text-sm text-gray-700">Loading languages...</div>
        ) : (
          allLanguage.map((lang, index) => (
            <button
              key={index}
              className="py-1 px-3 bg-white hover:bg-gray-100 rounded mb-1 text-left w-full"
              onClick={() => handleLanguageSelect(lang.code, lang.name)}
            >
              {lang.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default TextToTextTranslate;
