import TextBox from "../components/text-box";
import {
  PiArrowCounterClockwiseThin,
  PiCopySimpleThin,
  PiSoundcloudLogoThin,
  PiSwapThin,
  PiTextAaThin,
} from "react-icons/pi";
import { useEffect, useState } from "react";
import { LanguageData, TranslateData } from "../utils/api";
import MainButton from "../components/main-button";
import Header from "../components/header";
import DotDotLoading from "../components/dot-loading";

interface LanguageDataType {
  name: string;
  code: string;
}

const TextToTextTranslate = () => {
  const [allLanguage, setAllLanguages] = useState<LanguageDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [languageTo, setLanguageTo] = useState("hi");
  const [languageFrom, setLanguageFrom] = useState("en");
  const [isSelectingTo, setIsSelectingTo] = useState<boolean>(true);
  const [textBoxContent, setTextBoxContent] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguageFrom, setSelectedLanguageFrom] = useState("English");
  const [selectedLanguageTo, setSelectedLanguagTo] = useState("Hindi");

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

  const handleCopyToClipboard = () => {
    if (translatedText || textBoxContent) {
      navigator.clipboard
        .writeText(translatedText || textBoxContent)
        .then(() => {
          alert("Translation copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy text:", error);
        });
    } else {
      alert("No translation available to copy.");
    }
  };

  const handleSwapLanguages = () => {
    const tempLanguage = languageFrom;
    setLanguageFrom(languageTo);
    setLanguageTo(tempLanguage);
    const tempSelectedLanguage = selectedLanguageFrom;
    setSelectedLanguageFrom(selectedLanguageTo);
    setSelectedLanguagTo(tempSelectedLanguage);
    setTextBoxContent(translatedText);
    setTranslatedText(textBoxContent);
  };

  const resetTextBox = () => {
    setTextBoxContent("");
    setTranslatedText("");
  };

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto bg-yellow-200 justify-between">
      <div>
        <Header
          icon={<PiTextAaThin className="w-7 h-7 m-2 cursor-pointer z-10" />}
          text="Text Translate"
        />
      </div>
      <div className="relative h-screen">
        {/* Text Input */}
        <div className="bg-[#f3f5f7] p-8 rounded-tl-[120px] h-[400px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center w-[60%]">
              <PiSoundcloudLogoThin className="w-8 h-8 ml-8" />
              <p className="ml-3">{selectedLanguageFrom}</p>
            </div>
            <div className="flex items-center space-x-3">
              <PiCopySimpleThin
                className="w-5 h-5"
                onClick={handleCopyToClipboard}
              />
              <PiArrowCounterClockwiseThin onClick={resetTextBox} />
            </div>
          </div>
          <TextBox
            placeholder="Enter the text here"
            className="w-full h-40 max-w-3xl p-4 ml-5 resize-none text-2xl leading-relaxed focus:outline-none transition "
            value={textBoxContent}
            onChange={handleChange}
          />
        </div>

        <div className=" text-gray-900 p-8 w-full absolute top-60 bg-yellow-200 rounded-tl-[120px] ">
          <div className="flex justify-between mt-4 items-center">
            <div className="flex items-center  w-[60%]">
              <PiSoundcloudLogoThin className="w-8 h-8 ml-8" />
              <p className="ml-3">{selectedLanguageTo}</p>
            </div>
            <div className="flex items-center space-x-3">
              <PiCopySimpleThin
                className="w-5 h-5"
                onClick={handleCopyToClipboard}
              />
              <PiArrowCounterClockwiseThin onClick={resetTextBox} />
            </div>
          </div>
          <p className="text-2xl p-4 leading-12 overflow-auto ml-5 h-54 text-black">
            {translatedText || "Translation..."}
          </p>
        </div>
      </div>

      <div
        className={`absolute h-[85%] w-[340px] overflow-y-auto top-2 left-3 z-50 bottom-30 bg-[#f3f5f7] rounded-4xl hide-scrollbar 
    transition-all duration-300 ease-in-out transform 
    ${
      allLanguage.length > 0 || isLoading
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-5 pointer-events-none"
    }`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <DotDotLoading />
          </div>
        ) : (
          allLanguage.map((lang, index) => (
            <button
              key={index}
              className="py-1 px-3 hover:bg-amber-200 rounded mb-1 text-center w-full text-lg"
              onClick={() => handleLanguageSelect(lang.code, lang.name)}
            >
              {lang.name}
            </button>
          ))
        )}
      </div>

      {/* Language Buttons */}
      <div className="flex flex-wrap w-full justify-center mb-6 gap-2 items-stretch z-40">
        <MainButton
          onClick={() => handleClick("from")}
          className="h-full rounded-4xl border border-r-5 border-b-5 bg-[#f3f5f7] [30%]  "
          label={selectedLanguageFrom || "Change from"}
        />

        <MainButton
          label={selectedLanguageTo || "Change to"}
          className="h-full rounded-4xl border border-r-5 border-b-5 bg-[#f3f5f7] [30%]  "
          onClick={() => handleClick("to")}
        />

        <MainButton
          icon={<PiSwapThin className="w-6 h-6 " />}
          className="w-15 p-3 h-full rounded-full  border border-r-5 border-b-5 bg-[#f3f5f7] hover:bg-gray-100 transition-all duration-200"
          onClick={handleSwapLanguages}
        />
      </div>
    </div>
  );
};

export default TextToTextTranslate;
